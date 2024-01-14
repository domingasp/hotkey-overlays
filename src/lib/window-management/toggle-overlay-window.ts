import { BrowserWindow } from 'electron';
import path from 'node:path';

function toggleOverlayWindow(
  id: number,
  baseUrl: string,
  currentWindow: BrowserWindow | null
) {
  if (currentWindow == null) {
    const overlayWindow = new BrowserWindow({
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
    overlayWindow.setAlwaysOnTop(true, 'screen-saver');
    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.maximize();

    overlayWindow.loadURL(`${baseUrl}#/overlay/${id}`);

    overlayWindow.setPosition(0, 0);

    return overlayWindow;
  }

  currentWindow.close();
  return null;
}

export default toggleOverlayWindow;
