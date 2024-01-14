import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function getOverlays(store: Store<SchemaInterface>) {
  return store.get('overlays');
}

export default getOverlays;
