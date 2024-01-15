import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import Size from '../../models/Size';
import Position from '../../models/Position';
import { channelsToRenderer } from '../../shared/channels';

async function updateOverlayPositionSize(
  store: Store<SchemaInterface>,
  settingsWindow: BrowserWindow | null,
  id: number,
  position: Position,
  size: Size
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.position = position;
    overlayToUpdate.sizes.current = size;

    store.set('overlays', overlays);
  }

  if (settingsWindow !== null) {
    settingsWindow.webContents.send(channelsToRenderer.sendNotification, {
      type: 'success',
      message: 'Updated Position and Size',
    });
  }
}

export default updateOverlayPositionSize;
