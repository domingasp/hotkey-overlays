import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function updateOverlayAutoTurnOff(
  store: Store<SchemaInterface>,
  id: number,
  time: string
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.autoTurnOff = time;

    store.set('overlays', overlays);
  }
}

export default updateOverlayAutoTurnOff;
