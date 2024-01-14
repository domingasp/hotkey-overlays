import { Overlay } from '@mantine/core';
import { useParams } from 'react-router-dom';

function ConfigureOverlayPositionSize() {
  const { id } = useParams();

  return <Overlay blur={2}>HELLO - {id}</Overlay>;
}

export default ConfigureOverlayPositionSize;
