import { BrowserWindow } from 'electron';
import GenerateOverlayWindow from '../utils/overlay-window';

function toggleOverlayWindow(
  id: number,
  baseUrl: string,
  currentWindow: BrowserWindow | null
) {
  if (currentWindow == null) {
    const overlayWindow = GenerateOverlayWindow();

    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.loadURL(`${baseUrl}#/overlay/${id}`);

    return overlayWindow;
  }

  currentWindow.close();
  return null;
}

export default toggleOverlayWindow;
