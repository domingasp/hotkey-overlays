import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Center, Image } from '@mantine/core';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import ImagePath from '../../../../models/ImagePath';
import {
  fileToBase64,
  getOverlayAutoTurnOff,
  getOverlayImagePath,
  getOverlayPosition,
  getOverlaySize,
  toggleOverlayWindow,
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

  const [autoTurnOff, setAutoTurnOff] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      fetchAndSetState(getOverlayImagePath(idAsNumber), setImagePath);
      fetchAndSetState(getOverlaySize(idAsNumber), setSizes);
      fetchAndSetState(getOverlayPosition(idAsNumber), setPosition);
      fetchAndSetState(getOverlayAutoTurnOff(idAsNumber), setAutoTurnOff);
    }
  }, []);

  useEffect(() => {
    if (imagePath && imagePath.type !== 'url') {
      fetchAndSetState(fileToBase64(imagePath.path, imagePath.type), setImgSrc);
    } else {
      setImgSrc(imagePath?.path ?? '');
    }
  }, [imagePath]);

  useEffect(() => {
    if (id && autoTurnOff && autoTurnOff !== '00:00:00') {
      const split = autoTurnOff.split(':');
      const hoursAsSeconds = parseInt(split[0], 10) * 3600;
      const minutesAsSeconds = parseInt(split[1], 10) * 60;
      const totalTime =
        hoursAsSeconds + minutesAsSeconds + parseInt(split[2], 10);

      setTimeout(() => {
        toggleOverlayWindow(parseInt(id, 10));
      }, totalTime * 1000);
    }
  }, [autoTurnOff]);

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
