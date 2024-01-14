import { BrowserWindow, globalShortcut } from 'electron';

async function unregisterOverlayHotkeys(settingsWindow: BrowserWindow | null) {
  globalShortcut.unregisterAll();
  if (settingsWindow) settingsWindow.minimizable = false;
}

export default unregisterOverlayHotkeys;
