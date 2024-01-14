import Store from 'electron-store';
import { BrowserWindow, globalShortcut } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import toggleOverlayWindow from '../window-management/toggle-overlay-window';

async function registerOverlayHotkeys(
  store: Store<SchemaInterface>,
  baseUrl: string,
  overlayWindows: { [id: string]: BrowserWindow | null },
  settingsWindow: BrowserWindow | null
) {
  const overlays = store.get('overlays');
  overlays.forEach((overlay) =>
    globalShortcut.register(overlay.hotkey, () => {
      let currentWindow: BrowserWindow | null = null;
      if (Object.keys(overlayWindows).includes(overlay.id.toString())) {
        currentWindow = overlayWindows[overlay.id];
      }

      overlayWindows[overlay.id] = toggleOverlayWindow(
        overlay.id,
        baseUrl,
        currentWindow
      );
    })
  );

  if (settingsWindow) settingsWindow.minimizable = true;
}

export default registerOverlayHotkeys;
