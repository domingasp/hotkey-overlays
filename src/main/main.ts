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
import fs from 'fs';
import channels from '../shared/channels';
import iconPng from '../images/icons/hotkey-overlays-logo.png';
import Overlay from '../shared/types/Overlay';
import ImagePath from '../shared/types/ImagePath';

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

function createDefaultOverlay() {
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

function toggleOverlayWindow(id: number) {
  if (overlayWindow == null) {
    overlayWindow = new BrowserWindow({
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      fullscreen: true,
      hasShadow: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        preload: path.join(__dirname, '../preload', 'preload.js'),
      },
    });
    overlayWindow.setIgnoreMouseEvents(true);

    overlayWindow.loadURL(`http://localhost:5173/overlay/${id}`);

    overlayWindow.setPosition(0, 0);
  } else {
    overlayWindow.close();
    overlayWindow = null;
  }
}

async function getOverlays() {
  return store.get('overlays');
}

async function getOverlayImagePath(id: number) {
  const overlays = store.get('overlays');
  const overlay = overlays.find((x) => x.id === id);

  if (overlay) {
    return overlay.imagePath;
  }

  return undefined;
}

async function addOverlay() {
  const overlays = store.get('overlays');
  overlays.push({
    id: Math.max(...overlays.map((x) => x.id)) + 1,
    name: 'Default',
    hotkey: 'Ctrl+D',
  });

  store.set('overlays', overlays);
}

async function updateOverlayName(id: number, name: string) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.name = name;

    store.set('overlays', overlays);
  }
}

async function updateOverlayImage(
  id: number,
  imagePath: ImagePath | undefined
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.imagePath = imagePath;

    store.set('overlays', overlays);
  }
}

async function updateOverlayHotkey(id: number, hotkey: string) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.hotkey = hotkey;

    store.set('overlays', overlays);
  }
}

async function base64FromImagePath(imagePath: string) {
  try {
    const file = fs.readFileSync(imagePath);
    const base64Img = file.toString('base64');
    return base64Img;
  } catch {
    return undefined;
  }
}

async function registerOverlayHotkeys() {
  const overlays = store.get('overlays');
  overlays.forEach((overlay) =>
    globalShortcut.register(overlay.hotkey, () => {
      toggleOverlayWindow(overlay.id);
    })
  );
  if (settingsWindow) settingsWindow.minimizable = true;
}

async function unregisterOverlayHotkeys() {
  globalShortcut.unregisterAll();
  if (settingsWindow) settingsWindow.minimizable = false;
}

async function deleteOverlay(id: number) {
  const overlays = store.get('overlays');
  const overlayToDelete = overlays.findIndex((x) => x.id === id);

  if (overlayToDelete > -1) {
    overlays.splice(overlayToDelete, 1);

    store.set('overlays', overlays);
  }
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
    backgroundColor: '#242424',
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

app.whenReady().then(() => {
  ipcMain.handle(channels.getOverlays, getOverlays);
  ipcMain.handle(channels.getOverlayImagePath, (_event, id) =>
    getOverlayImagePath(id)
  );
  ipcMain.handle(channels.addOverlay, () => addOverlay());
  ipcMain.handle(channels.updateOverlayName, (_event, id, name) =>
    updateOverlayName(id, name)
  );
  ipcMain.handle(channels.updateOverlayImage, (_event, id, imagePath) =>
    updateOverlayImage(id, imagePath)
  );
  ipcMain.handle(channels.updateOverlayHotkey, (_event, id, hotkey) =>
    updateOverlayHotkey(id, hotkey)
  );
  ipcMain.handle(channels.deleteOverlay, (_event, id) => deleteOverlay(id));
  ipcMain.handle(channels.base64FromImagePath, (_event, imagePath) =>
    base64FromImagePath(imagePath)
  );
  ipcMain.handle(channels.registerOverlayHotkeys, () =>
    registerOverlayHotkeys()
  );
  ipcMain.handle(channels.unregisterOverlayHotkeys, () =>
    unregisterOverlayHotkeys()
  );

  createDefaultOverlay();
  createTrayIron();
  createSettingsWindow();
  registerOverlayHotkeys();
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
