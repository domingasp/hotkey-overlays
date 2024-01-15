import { BrowserWindow } from 'electron';
import toggleOverlayWindow from './toggle-overlay-window';

async function reopenAllOpenedOverlays(
  baseUrl: string,
  overlayWindows: {
    [id: string]: BrowserWindow | null;
  }
) {
  Object.keys(overlayWindows).forEach((id) => {
    if (overlayWindows[id] !== null) {
      overlayWindows[id] = toggleOverlayWindow(
        parseInt(id, 10),
        baseUrl,
        overlayWindows[id]
      );
      overlayWindows[id] = toggleOverlayWindow(
        parseInt(id, 10),
        baseUrl,
        overlayWindows[id]
      );
    }
  });
}

export default reopenAllOpenedOverlays;
