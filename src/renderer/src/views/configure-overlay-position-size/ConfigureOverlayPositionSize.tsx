import { Box, Button, Center, Image, Overlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import ImagePath from '../../../../models/ImagePath';
import 'react-resizable/css/styles.css';
import {
  closeConfigureOverlayPositionSizeWindow,
  fileToBase64,
  getOverlayImagePath,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';

function ConfigureOverlayPositionSize() {
  const { id } = useParams();

  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  const [pos, setPos] = useState({ x: 20, y: 30 });
  const [size, setSize] = useState({ width: 200, height: 200 });

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
    <Overlay backgroundOpacity={0.75}>
      <Box pos="absolute" style={{ zIndex: 2 }}>
        <Button onClick={() => closeConfigureOverlayPositionSizeWindow()}>
          Cancel
        </Button>
      </Box>
      <Center
        h="100%"
        style={{
          overflow: 'hidden',
        }}
      >
        <Draggable
          handle=".handle"
          defaultPosition={pos}
          grid={[5, 5]}
          onStop={(_e, { x, y }) => {
            setPos({ x, y });
          }}
        >
          <ResizableBox
            height={size.height}
            width={size.width}
            onResize={(_event, { size: s }) => {
              setSize({ width: s.width, height: s.height });
            }}
            lockAspectRatio
          >
            <div className="handle">MOVE HANDLE</div>
            <Image src={imgSrc} />
          </ResizableBox>
        </Draggable>
      </Center>
    </Overlay>
  );
}

export default ConfigureOverlayPositionSize;
