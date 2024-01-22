import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function getOverlays(store: Store<SchemaInterface>) {
  return store.get('overlays').sort((a, b) => a.order - b.order);
}

export default getOverlays;
