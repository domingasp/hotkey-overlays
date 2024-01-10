import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Image } from '@mantine/core';
import ImagePath from '../../../../shared/types/ImagePath';
import fileToBase64 from '../../services/utils';

function Overlay() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    async function getOverlayImagePath(idToFetch: number) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (window as any).hotkeyOverlaysAPI.getOverlayImagePath(
        idToFetch
      );
      setImagePath(res);
    }

    if (id) {
      getOverlayImagePath(parseInt(id, 10));
    }
  }, []);

  useEffect(() => {
    async function setImageSrcFromImagePath() {
      if (imagePath) {
        setImgSrc(await fileToBase64(imagePath.path, imagePath.type));
      }
    }

    if (imagePath && imagePath.type !== 'url') {
      setImageSrcFromImagePath();
    } else {
      setImgSrc(imagePath?.path ?? '');
    }
  }, [imagePath]);

  return (
    <Center h="100%">
      <Image src={imgSrc} mah={300} />
    </Center>
  );
}

export default Overlay;
