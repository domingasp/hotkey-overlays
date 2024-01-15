import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Center, Image } from '@mantine/core';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import ImagePath from '../../../../models/ImagePath';
import {
  fileToBase64,
  getOverlayImagePath,
  getOverlayPosition,
  getOverlaySize,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';

function Overlay() {
  const { id } = useParams();
  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sizes, setSizes] = useState({
    default: { width: 0, height: 0 },
    current: { width: 0, height: 0 },
  });

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      fetchAndSetState(getOverlayImagePath(idAsNumber), setImagePath);
      fetchAndSetState(getOverlaySize(idAsNumber), setSizes);
      fetchAndSetState(getOverlayPosition(idAsNumber), setPosition);
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
    <Center h="100%" style={{ overflow: 'hidden', position: 'relative' }}>
      <ResizableBox
        height={sizes.current.height}
        width={sizes.current.width}
        lockAspectRatio
        handle={<div />}
      >
        <Draggable position={position}>
          <Box>
            <Image
              src={imgSrc}
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            />
          </Box>
        </Draggable>
      </ResizableBox>
    </Center>
  );
}

export default Overlay;
