import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function addOverlay(store: Store<SchemaInterface>) {
  const overlays = store.get('overlays');
  overlays.push({
    id: overlays.length === 0 ? 1 : Math.max(...overlays.map((x) => x.id)) + 1,
    name: 'Default',
    hotkey: 'Ctrl+D',
    position: { x: 0, y: 0 },
    sizes: {
      default: { width: 0, height: 0 },
      current: { width: 0, height: 0 },
    },
  });

  store.set('overlays', overlays);
}

export default addOverlay;
