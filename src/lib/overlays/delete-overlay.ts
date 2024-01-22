import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import { channelsToRenderer } from '../../shared/channels';

async function deleteOverlay(
  store: Store<SchemaInterface>,
  overlayWindow: BrowserWindow | null,
  id: number
) {
  const overlays = store.get('overlays');
  const overlayToDelete = overlays.findIndex((x) => x.id === id);

  if (overlayToDelete > -1) {
    overlays.splice(overlayToDelete, 1);
    store.set('overlays', overlays);

    if (overlayWindow !== null) {
      overlayWindow.webContents.send(channelsToRenderer.overlayDeleted, id);
    }
  }
}

export default deleteOverlay;
