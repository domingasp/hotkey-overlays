import Store from 'electron-store';
import { BrowserWindow, globalShortcut } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import { channelsToRenderer } from '../../shared/channels';

async function registerOverlayHotkeys(
  store: Store<SchemaInterface>,
  overlayWindow: BrowserWindow | null,
  settingsWindow: BrowserWindow | null
) {
  const overlays = store.get('overlays');
  overlays.forEach((overlay) =>
    globalShortcut.register(overlay.hotkey, () => {
      if (overlayWindow !== null) {
        overlayWindow.webContents.send(
          channelsToRenderer.toggleOverlay,
          overlay.id
        );
      }
    })
  );

  if (settingsWindow) settingsWindow.minimizable = true;
}

export default registerOverlayHotkeys;
