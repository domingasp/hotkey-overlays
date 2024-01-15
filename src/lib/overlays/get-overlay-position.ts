import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function getOverlayPosition(store: Store<SchemaInterface>, id: number) {
  const overlays = store.get('overlays');
  const overlay = overlays.find((x) => x.id === id);

  if (overlay) {
    return overlay.position;
  }

  return undefined;
}

export default getOverlayPosition;
