import { BrowserWindow, app, globalShortcut } from 'electron';
import Store from 'electron-store';

let settingsWindow: BrowserWindow | null;
let overlayWindow: BrowserWindow | null;

const schema = {
  overlayKeyCombination: {
    type: 'string',
    default: 'CommandOrControl+Shift+]',
  },
} as const;
const store = new Store({ schema });

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    autoHideMenuBar: true,
  });

  settingsWindow.loadURL('http://localhost:5173');
  settingsWindow.on('closed', () => {
    settingsWindow = null;
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
  createSettingsWindow();
  globalShortcut.register(
    store.get('overlayKeyCombination') as string,
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
