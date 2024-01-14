import { Box, Button, Center, Image, Overlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import ImagePath from '../../../../models/ImagePath';
import fileToBase64 from '../../services/utils';
import 'react-resizable/css/styles.css';

function ConfigureOverlayPositionSize() {
  const { id } = useParams();

  const [imagePath, setImagePath] = useState<ImagePath | undefined>();
  const [imgSrc, setImgSrc] = useState('');

  const [pos, setPos] = useState({ x: 20, y: 30 });
  const [size, setSize] = useState({ width: 200, height: 200 });

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

  async function closeConfigureOverlayPositionSizeWindow() {
    await (
      window as any
    ).hotkeyOverlaysAPI.closeConfigureOverlayPositionSizeWindow();
  }

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
