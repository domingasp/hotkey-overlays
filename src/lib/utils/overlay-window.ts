import { BrowserWindow } from 'electron';
import path from 'node:path';

function GenerateOverlayWindow() {
  const window = new BrowserWindow({
    transparent: true,
    frame: false,
    fullscreen: true,
    autoHideMenuBar: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload', 'preload.js'),
    },
  });

  window.setAlwaysOnTop(true, 'screen-saver');
  window.maximize();
  window.setPosition(0, 0);

  return window;
}

export default GenerateOverlayWindow;
