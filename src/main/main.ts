import { BrowserWindow, Menu, Tray, app, ipcMain, nativeImage } from 'electron';
import Store, { Schema } from 'electron-store';
import path from 'node:path';
import fs from 'fs';
import channels from '../shared/channels';
import iconPng from '../images/icons/hotkey-overlays-logo.png';
import Overlay from '../shared/types/Overlay';

const icon = nativeImage.createFromDataURL(iconPng);

let tray;
let settingsWindow: BrowserWindow | null;
let overlayWindow: BrowserWindow | null;

let isQuiting = false;

interface SchemaInterface {
  overlays: Overlay[];
}
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
          type: 'string',
        },
      },
      required: ['name', 'hotkey'],
    },
    default: [],
  },
};
const store = new Store({ schema });

function createDefaultOverlay() {
  const overlays = store.get('overlays');
  if (overlays.length === 0) {
    overlays.push({
      id: 1,
      name: 'Default',
      hotkey: 'CmdOrCtrl+Shift+]',
    });

    store.set('overlays', overlays);
  }
}

async function getOverlays() {
  return store.get('overlays');
}

async function updateOverlayName(id: number, name: string) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.name = name;

    store.set('overlays', overlays);
  }
}

async function updateOverlayImage(id: number, imagePath: string | undefined) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.imagePath = imagePath;

    store.set('overlays', overlays);
  }
}

async function base64FromImagePath(imagePath: string) {
  const base64Img = fs.readFileSync(imagePath).toString('base64');
  return base64Img;
}

function createTrayIron() {
  tray = new Tray(icon);
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
    icon,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload', 'preload.js'),
    },
  });

  settingsWindow.loadURL('http://localhost:5173');
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

function toggleOverlayWindow() {
  if (overlayWindow == null) {
    overlayWindow = new BrowserWindow({
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      hasShadow: false,
      alwaysOnTop: true,
      skipTaskbar: true,
    });
    overlayWindow.setIgnoreMouseEvents(true);

    overlayWindow.loadURL('http://localhost:5173/overlay');

    overlayWindow.setPosition(0, 0);
  } else {
    overlayWindow.close();
    overlayWindow = null;
  }
}

app.whenReady().then(() => {
  ipcMain.handle(channels.getOverlays, getOverlays);
  ipcMain.handle(channels.updateOverlayName, (_event, id, name) =>
    updateOverlayName(id, name)
  );
  ipcMain.handle(channels.updateOverlayImage, (_event, id, imagePath) =>
    updateOverlayImage(id, imagePath)
  );
  ipcMain.handle(channels.base64FromImagePath, (_event, imagePath) =>
    base64FromImagePath(imagePath)
  );

  createDefaultOverlay();
  createTrayIron();
  createSettingsWindow();

  // globalShortcut.register('CmdOrCtrl+Shift+]', toggleOverlayWindow);
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
