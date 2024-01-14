import Store from 'electron-store';
import SchemaInterface from '../../models/SchemaInterface';

async function updateOverlayHotkey(
  store: Store<SchemaInterface>,
  id: number,
  hotkey: string
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.hotkey = hotkey;

    store.set('overlays', overlays);
  }
}

export default updateOverlayHotkey;
