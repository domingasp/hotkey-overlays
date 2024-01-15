import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function updateOverlayName(
  store: Store<SchemaInterface>,
  id: number,
  name: string
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.name = name;

    store.set('overlays', overlays);
  }
}

export default updateOverlayName;
