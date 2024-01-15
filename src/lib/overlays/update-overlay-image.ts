import Store from 'electron-store';
import ImagePath from '../../models/ImagePath';
import SchemaInterface from '../../models/SchemaInterface';

async function updateOverlayImage(
  store: Store<SchemaInterface>,
  id: number,
  imagePath: ImagePath | undefined,
  initialSize: { width: number; height: number }
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.imagePath = imagePath;
    overlayToUpdate.size = initialSize;

    store.set('overlays', overlays);
  }
}

export default updateOverlayImage;
