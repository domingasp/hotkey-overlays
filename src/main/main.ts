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
import openConfigureOverlayPositionSize from '../lib/overlays/open-configure-overlay-position-size';
import closeConfigureOverlayPositionSizeWindow from '../lib/overlays/close-configure-overlay-position-size';
import getOverlaySize from '../lib/overlays/get-overlay-size';
import getOverlayPosition from '../lib/overlays/get-overlay-position';
import updateOverlayPositionSize from '../lib/overlays/update-overlay-position-size';
import updateOverlayAutoTurnOff from '../lib/overlays/update-overlay-auto-turn-off';
import getOverlayAutoTurnOff from '../lib/overlays/get-overlay-auto-turn-off';
import GenerateOverlayWindow from '../lib/utils/overlay-window';
import getOverlay from '../lib/overlays/get-overlay';
import deleteOverlay from '../lib/overlays/delete-overlay';

let IS_DEV = false;
IS_DEV = !app.isPackaged;

const baseUrl = IS_DEV
  ? 'http://localhost:5173'
  : path.join(__dirname, '../renderer', 'index.html');

let isQuiting = false;

let tray;
let settingsWindow: BrowserWindow | null;
let overlayWindow: BrowserWindow | null;
let configureOverlayPositionSizeWindow: BrowserWindow | null = null;

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
        position: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
          },
        },
        sizes: {
          type: 'object',
          properties: {
            default: {
              type: 'object',
              properties: {
                width: { type: 'number' },
                height: { type: 'number' },
              },
            },
            current: {
              type: 'object',
              properties: {
                width: { type: 'number' },
                height: { type: 'number' },
              },
            },
          },
        },
        autoTurnOff: { type: 'string' },
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
      position: { x: 0, y: 0 },
      sizes: {
        default: { width: 0, height: 0 },
        current: { width: 0, height: 0 },
      },
    });

    store.set('overlays', overlays);
  }
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

function createOverlayWindow() {
  overlayWindow = GenerateOverlayWindow();
  overlayWindow.setIgnoreMouseEvents(true);
  overlayWindow.loadURL(`${baseUrl}#/overlay-display`);

  if (IS_DEV) {
    overlayWindow.webContents.openDevTools();
  }

  overlayWindow.setFocusable(false);
  overlayWindow.showInactive();
}

app.whenReady().then(() => {
  createDefaultOverlayInStore();
  createTrayIron();
  createSettingsWindow();
  createOverlayWindow();
  registerOverlayHotkeys(store, overlayWindow, settingsWindow);

  // Basic Overlay Configuration
  ipcMain.handle(channels.getOverlays, () => getOverlays(store));

  ipcMain.handle(channels.getOverlay, (_, id: number) => getOverlay(store, id));

  ipcMain.handle(channels.getOverlayImagePath, (_, id) =>
    getOverlayImagePath(store, id)
  );

  ipcMain.handle(channels.getOverlaySize, (_, id) => getOverlaySize(store, id));

  ipcMain.handle(channels.getOverlayPosition, (_, id) =>
    getOverlayPosition(store, id)
  );

  ipcMain.handle(channels.getOverlayAutoTurnOff, (_, id) =>
    getOverlayAutoTurnOff(store, id)
  );

  ipcMain.handle(channels.addOverlay, () => addOverlay(store));

  ipcMain.handle(channels.updateOverlayName, (_, id, name) =>
    updateOverlayName(store, id, name)
  );

  ipcMain.handle(channels.updateOverlayImage, (_, id, imagePath, size) =>
    updateOverlayImage(store, overlayWindow, id, imagePath, size)
  );

  ipcMain.handle(channels.updateOverlayHotkey, (_, id, hotkey) =>
    updateOverlayHotkey(store, id, hotkey)
  );

  ipcMain.handle(
    channels.updateOverlayPositionSize,
    async (_, id, position, size) => {
      await updateOverlayPositionSize(
        store,
        settingsWindow,
        overlayWindow,
        id,
        position,
        size
      );
    }
  );

  ipcMain.handle(channels.updateOverlayAutoTurnOff, (_, id, time) =>
    updateOverlayAutoTurnOff(store, overlayWindow, id, time)
  );

  ipcMain.handle(channels.deleteOverlay, (_, id) => {
    unregisterOverlayHotkeys(settingsWindow);
    deleteOverlay(store, overlayWindow, id);
    registerOverlayHotkeys(store, overlayWindow, settingsWindow);
  });

  // Overlay position + size configuration
  ipcMain.handle(channels.openConfigureOverlayPositionSize, async (_, id) => {
    configureOverlayPositionSizeWindow = await openConfigureOverlayPositionSize(
      id,
      baseUrl,
      settingsWindow,
      configureOverlayPositionSizeWindow
    );
  });

  ipcMain.handle(channels.closeConfigureOverlayPositionSizeWindow, async () => {
    configureOverlayPositionSizeWindow =
      await closeConfigureOverlayPositionSizeWindow(
        configureOverlayPositionSizeWindow,
        store,
        baseUrl,
        overlayWindow,
        settingsWindow
      );
  });

  // Utils
  ipcMain.handle(channels.base64FromImagePath, (_, imagePath) =>
    base64FromImagePath(imagePath)
  );

  ipcMain.handle(channels.registerOverlayHotkeys, () =>
    registerOverlayHotkeys(store, overlayWindow, settingsWindow)
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
