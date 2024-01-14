import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function addOverlay(store: Store<SchemaInterface>) {
  const overlays = store.get('overlays');
  overlays.push({
    id: overlays.length === 0 ? 1 : Math.max(...overlays.map((x) => x.id)) + 1,
    name: 'Default',
    hotkey: 'Ctrl+D',
  });

  store.set('overlays', overlays);
}

export default addOverlay;
