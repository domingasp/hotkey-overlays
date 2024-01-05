import { BrowserWindow, app, globalShortcut } from 'electron';

let settingsWindow;
let overlayWindow;

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
      fullscreen: true,
    });
    overlayWindow.setAlwaysOnTop(true, 'screen');
    overlayWindow.setIgnoreMouseEvents(true);

    overlayWindow.loadURL('http://localhost:5173');
  } else {
    overlayWindow.close();
    overlayWindow = null;
  }
}

app.whenReady().then(() => {
  createSettingsWindow();
  globalShortcut.register('CommandOrControl+Shift+]', toggleOverlayWindow);
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
