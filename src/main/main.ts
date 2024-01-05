import {
  BrowserWindow,
  Menu,
  Tray,
  app,
  globalShortcut,
  ipcMain,
  nativeImage,
} from 'electron';
import Store, { Schema } from 'electron-store';
import path from 'node:path';
import channels from '../shared/channels';
import iconPng from '../images/icons/hotkey-overlays-logo.png';
import Overlay from '../shared/types/Overlay';

const icon = nativeImage.createFromDataURL(iconPng);

let tray;
let settingsWindow: BrowserWindow | null;
let overlayWindow: BrowserWindow | null;

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
      hotkey: 'CommandOrControl+Shift+]',
    });

    store.set('overlays', overlays);
  }
}

async function getOverlays() {
  return store.get('overlays');
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
          app.quit();
        },
      },
    ])
  );

  tray.on('double-click', () => settingsWindow?.show());
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
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

    overlayWindow.loadURL('http://localhost:5173');

    overlayWindow.setPosition(0, 0);
  } else {
    overlayWindow.close();
    overlayWindow = null;
  }
}

app.whenReady().then(() => {
  ipcMain.handle(channels.getOverlays, getOverlays);

  createDefaultOverlay();
  createTrayIron();
  createSettingsWindow();

  globalShortcut.register(
    store.get('overlays')[0].hotkey as string,
    toggleOverlayWindow
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
