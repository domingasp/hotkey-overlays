import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function getOverlayImagePath(store: Store<SchemaInterface>, id: number) {
  const overlays = store.get('overlays');
  const overlay = overlays.find((x) => x.id === id);

  if (overlay) {
    return overlay.imagePath;
  }

  return undefined;
}

export default getOverlayImagePath;
