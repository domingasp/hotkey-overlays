import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';

async function deleteOverlay(
  store: Store<SchemaInterface>,
  overlayWindows: { [id: string]: BrowserWindow | null },
  id: number
) {
  const overlays = store.get('overlays');
  const overlayToDelete = overlays.findIndex((x) => x.id === id);

  if (overlayToDelete > -1) {
    overlays.splice(overlayToDelete, 1);

    store.set('overlays', overlays);

    const idAsStr = id.toString();
    if (overlayWindows[idAsStr] !== undefined) {
      const window = overlayWindows[idAsStr];
      if (window !== null) {
        window.close();
      }

      delete overlayWindows[idAsStr];
    }
  }
}

export default deleteOverlay;
