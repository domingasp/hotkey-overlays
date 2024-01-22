import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import sendOverlayUpdated from '../utils/send-overlay-updated';

async function updateOverlayAutoTurnOff(
  store: Store<SchemaInterface>,
  overlayWindow: BrowserWindow | null,
  id: number,
  time: string
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.autoTurnOff = time;

    store.set('overlays', overlays);
    sendOverlayUpdated(overlayWindow, id);
  }
}

export default updateOverlayAutoTurnOff;
