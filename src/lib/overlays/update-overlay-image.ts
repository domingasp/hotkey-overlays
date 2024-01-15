import Store from 'electron-store';
import ImagePath from '../../models/ImagePath';
import SchemaInterface from '../../models/SchemaInterface';
import Size from '../../models/Size';

async function updateOverlayImage(
  store: Store<SchemaInterface>,
  id: number,
  imagePath: ImagePath | undefined,
  size: Size
) {
  const overlays = store.get('overlays');
  const overlayToUpdate = overlays.find((x) => x.id === id);

  if (overlayToUpdate) {
    overlayToUpdate.imagePath = imagePath;

    // New default size if image is updates
    overlayToUpdate.sizes.default = size;
    overlayToUpdate.sizes.current = size;

    store.set('overlays', overlays);
  }
}

export default updateOverlayImage;
