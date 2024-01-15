import { Box, Center, Image, Overlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import ImagePath from '../../../../models/ImagePath';
import 'react-resizable/css/styles.css';
import {
  fileToBase64,
  getOverlayImagePath,
  getOverlayPosition,
  getOverlaySize,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';
import StateButtons from './components/StateButtons';
import ResizeHandle from './components/ResizeHandle';

function ConfigureOverlayPositionSize() {
  const { id } = useParams();

  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      fetchAndSetState(getOverlayImagePath(idAsNumber), setImagePath);
      fetchAndSetState(getOverlaySize(idAsNumber), setSize);
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
    <Overlay backgroundOpacity={0.75}>
      <StateButtons />

      <Center
        h="100%"
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ResizableBox
          height={size.height}
          width={size.width}
          // onResize={(_event, { size: s }) => {}}
          lockAspectRatio
          draggableOpts={{ grid: [10, 10] }}
          handle={<ResizeHandle />}
        >
          <Draggable
            defaultPosition={position}
            grid={[5, 5]}
            onStop={(_e, { x, y }) => {
              console.log(x, y);
            }}
          >
            <Box>
              <Image
                src={imgSrc}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
            </Box>
          </Draggable>
        </ResizableBox>
      </Center>
    </Overlay>
  );
}

export default ConfigureOverlayPositionSize;
