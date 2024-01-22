import { BrowserWindow } from 'electron';
import GenerateOverlayWindow from '../utils/overlay-window';

function toggleOverlay(
  id: number,
  baseUrl: string,
  currentWindow: BrowserWindow | null
) {
  if (currentWindow == null) {
    const overlayWindow = GenerateOverlayWindow();

    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.loadURL(`${baseUrl}#/overlay/${id}`);

    overlayWindow.setFocusable(false);
    overlayWindow.showInactive();

    return overlayWindow;
  }

  currentWindow.close();
  return null;
}

export default toggleOverlay;
