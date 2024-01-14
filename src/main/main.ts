import { BrowserWindow, Menu, Tray, app, ipcMain, nativeImage } from 'electron';
import Store, { Schema } from 'electron-store';
import path from 'node:path';
import channels from '../shared/channels';
import appIconIco from '../../out/main/icon.ico?asset';
import SchemaInterface from '../models/SchemaInterface';
import getOverlays from '../lib/overlays/get-overlays';
import getOverlayImagePath from '../lib/overlays/get-overlay-image-path';
import addOverlay from '../lib/overlays/add-overlay';
import updateOverlayName from '../lib/overlays/update-overlay-name';
import updateOverlayHotkey from '../lib/overlays/update-overlay-hotkey';
import updateOverlayImage from '../lib/overlays/update-overlay-image';
import base64FromImagePath from '../lib/utils/base64-from-image-path';
import registerOverlayHotkeys from '../lib/global-hotkeys/register-hotkeys';
import unregisterOverlayHotkeys from '../lib/global-hotkeys/unregister-hotkeys';
import deleteOverlay from '../lib/overlays/delete-overlay';

let IS_DEV = false;
IS_DEV = !app.isPackaged;

const baseUrl = IS_DEV
  ? 'http://localhost:5173'
  : path.join(__dirname, '../renderer', 'index.html');

let isQuiting = false;

let tray;
let settingsWindow: BrowserWindow | null;
let configureOverlayPositionSizeWindow: BrowserWindow | null;

const overlayWindows: { [id: string]: BrowserWindow | null } = {};

const schema: Schema<SchemaInterface> = {
  overlays: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        hotkey: {
          type: 'string',
        },
        imagePath: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            type: { type: 'string' },
          },
        },
      },
      required: ['name', 'hotkey'],
    },
    default: [],
  },
};
const store = new Store({ schema });

function createDefaultOverlayInStore() {
  const overlays = store.get('overlays');
  if (overlays.length === 0) {
    overlays.push({
      id: 1,
      name: 'Default',
      hotkey: 'Ctrl+Shift+]',
    });

    store.set('overlays', overlays);
  }
}

function openConfigureOverlayPositionSizeWindow(id: number) {
  if (configureOverlayPositionSizeWindow == null) {
    configureOverlayPositionSizeWindow = new BrowserWindow({
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      resizable: false,
      hasShadow: false,
      skipTaskbar: true,
      webPreferences: {
        preload: path.join(__dirname, '../preload', 'preload.js'),
      },
    });
    configureOverlayPositionSizeWindow.setAlwaysOnTop(true, 'screen-saver');
    configureOverlayPositionSizeWindow.maximize();

    configureOverlayPositionSizeWindow.loadURL(
      `${baseUrl}#/overlay/${id}/position-size`
    );

    configureOverlayPositionSizeWindow.setPosition(0, 0);
  }
}

async function closeConfigureOverlayPositionSizeWindow() {
  if (configureOverlayPositionSizeWindow !== null) {
    configureOverlayPositionSizeWindow.close();
    configureOverlayPositionSizeWindow = null;
  }

  await registerOverlayHotkeys(store, baseUrl, overlayWindows, settingsWindow);
}

async function openConfigureOverlayPositionSize(id: number) {
  await unregisterOverlayHotkeys(settingsWindow);

  openConfigureOverlayPositionSizeWindow(id);
}

function createTrayIron() {
  tray = new Tray(nativeImage.createFromPath(appIconIco));
  tray.setToolTip('Hotkey Overlays');

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Settings',
        click: () => settingsWindow?.show(),
      },
      {
        label: 'Quit',
        click: () => {
          isQuiting = true;
          app.quit();
        },
      },
    ])
  );

  tray.on('double-click', () => settingsWindow?.show());
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    height: 750,
    width: 500,
    minWidth: 500,
    autoHideMenuBar: true,
    backgroundColor: '#242424',
    icon: appIconIco,
    webPreferences: {
      preload: path.join(__dirname, '../preload', 'preload.js'),
    },
  });

  settingsWindow.loadURL(baseUrl);

  if (IS_DEV) {
    settingsWindow.webContents.openDevTools();
  }

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });

  settingsWindow.on('minimize', () => {
    settingsWindow?.hide();
  });

  settingsWindow.on('close', (event) => {
    if (!isQuiting) {
      event.preventDefault();
      settingsWindow?.hide();
    }
    return false;
  });
}

app.whenReady().then(() => {
  createDefaultOverlayInStore();
  createTrayIron();
  createSettingsWindow();
  registerOverlayHotkeys(store, baseUrl, overlayWindows, settingsWindow);

  // Basic Overlay Configuration
  ipcMain.handle(channels.getOverlays, () => getOverlays(store));

  ipcMain.handle(channels.getOverlayImagePath, (_, id) =>
    getOverlayImagePath(store, id)
  );

  ipcMain.handle(channels.addOverlay, () => addOverlay(store));

  ipcMain.handle(channels.updateOverlayName, (_event, id, name) =>
    updateOverlayName(store, id, name)
  );

  ipcMain.handle(channels.updateOverlayImage, (_event, id, imagePath) =>
    updateOverlayImage(store, id, imagePath)
  );

  ipcMain.handle(channels.updateOverlayHotkey, (_event, id, hotkey) =>
    updateOverlayHotkey(store, id, hotkey)
  );

  ipcMain.handle(channels.deleteOverlay, (_event, id) =>
    deleteOverlay(store, id)
  );

  // Overlay position + size configuration
  ipcMain.handle(channels.openConfigureOverlayPositionSize, (_event, id) =>
    openConfigureOverlayPositionSize(id)
  );

  ipcMain.handle(
    channels.closeConfigureOverlayPositionSizeWindow,
    closeConfigureOverlayPositionSizeWindow
  );

  // Utils
  ipcMain.handle(channels.base64FromImagePath, (_event, imagePath) =>
    base64FromImagePath(imagePath)
  );

  ipcMain.handle(channels.registerOverlayHotkeys, () =>
    registerOverlayHotkeys(store, baseUrl, overlayWindows, settingsWindow)
  );

  ipcMain.handle(channels.unregisterOverlayHotkeys, () =>
    unregisterOverlayHotkeys(settingsWindow)
  );
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (settingsWindow == null) {
    createSettingsWindow();
  }
});
