import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Image } from '@mantine/core';
import ImagePath from '../../../../models/ImagePath';
import {
  fileToBase64,
  getOverlayImagePath,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';

function Overlay() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      fetchAndSetState(getOverlayImagePath(idAsNumber), setImagePath);
    }
  }, []);

  useEffect(() => {
    if (imagePath && imagePath.type !== 'url') {
      fetchAndSetState(fileToBase64(imagePath.path, imagePath.type), setImgSrc);
    } else {
      setImgSrc(imagePath?.path ?? '');
    }
  }, [imagePath]);

  return (
    <Center h="100%" style={{ overflow: 'hidden' }}>
      <Image src={imgSrc} h={300} />
    </Center>
  );
}

export default Overlay;
