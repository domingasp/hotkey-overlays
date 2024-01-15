import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';
import Size from '../../models/Size';
import Position from '../../models/Position';

async function updateOverlayPositionSize(
  store: Store<SchemaInterface>,
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
}

export default updateOverlayPositionSize;
