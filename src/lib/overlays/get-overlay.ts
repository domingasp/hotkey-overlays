import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function getOverlay(store: Store<SchemaInterface>, id: number) {
  return store.get('overlays').find((x) => x.id === id);
}

export default getOverlay;
