import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function deleteOverlay(store: Store<SchemaInterface>, id: number) {
  const overlays = store.get('overlays');
  const overlayToDelete = overlays.findIndex((x) => x.id === id);

  if (overlayToDelete > -1) {
    overlays.splice(overlayToDelete, 1);

    store.set('overlays', overlays);
  }
}

export default deleteOverlay;
