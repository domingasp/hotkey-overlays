import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import SchemaInterface from '../../models/SchemaInterface';
import sendOverlayUpdated from '../utils/send-overlay-updated';

async function updateOverlayOrder(
  store: Store<SchemaInterface>,
  overlayWindow: BrowserWindow | null,
  order: [{ id: number; order: number }]
) {
  const overlays = store.get('overlays');

  order.forEach((x) => {
    const overlay = overlays.find((y) => y.id === x.id);
    if (overlay) {
      overlay.order = x.order;
    }
  });

  store.set('overlays', overlays);

  order.forEach((x) => sendOverlayUpdated(overlayWindow, x.id));
}

export default updateOverlayOrder;
