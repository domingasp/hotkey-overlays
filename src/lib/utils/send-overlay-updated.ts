import { BrowserWindow } from 'electron';
import { channelsToRenderer } from '../../shared/channels';

function sendOverlayUpdated(overlayWindow: BrowserWindow | null, id: number) {
  if (overlayWindow !== null) {
    overlayWindow.webContents.send(channelsToRenderer.overlayUpdated, id);
  }
}

export default sendOverlayUpdated;
