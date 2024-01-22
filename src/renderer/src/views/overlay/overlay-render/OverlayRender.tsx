import { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { Box, Image } from '@mantine/core';
import Overlay from '../../../../../models/Overlay';
import fetchAndSetState from '../../../services/utils';
import { fileToBase64 } from '../../../services/HotkeyOverlaysAPI';
import ImagePath from '../../../../../models/ImagePath';

type OverlayRenderProps = {
  overlay: Overlay;
};
const OverlayRender = function OverlayRender({ overlay }: OverlayRenderProps) {
  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sizes, setSizes] = useState({
    default: { width: 0, height: 0 },
    current: { width: 0, height: 0 },
  });

  const [autoTurnOff, setAutoTurnOff] = useState<string | undefined>();

  useEffect(() => {
    setImagePath(overlay.imagePath);
    setSizes(overlay.sizes);
    setPosition(overlay.position);
    setAutoTurnOff(overlay.autoTurnOff);
  }, []);

  useEffect(() => {
    if (imagePath && imagePath.type !== 'url') {
      fetchAndSetState(fileToBase64(imagePath.path, imagePath.type), setImgSrc);
    } else {
      setImgSrc(imagePath?.path ?? '');
    }
  }, [imagePath]);

  // useEffect(() => {
  //   if (id && autoTurnOff && autoTurnOff !== '00:00:00') {
  //     const split = autoTurnOff.split(':');
  //     const hoursAsSeconds = parseInt(split[0], 10) * 3600;
  //     const minutesAsSeconds = parseInt(split[1], 10) * 60;
  //     const totalTime =
  //       hoursAsSeconds + minutesAsSeconds + parseInt(split[2], 10);

  //     setTimeout(() => {
  //       toggleOverlayWindow(parseInt(id, 10));
  //     }, totalTime * 1000);
  //   }
  // }, [autoTurnOff]);

  return (
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
  );
};

export default OverlayRender;
