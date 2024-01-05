import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import Overlay from '../../shared/types/Overlay';
import Settings from './views/Settings';

function App() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  useEffect(() => {
    async function getOverlays() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (window as any).hotkeyOverlaysAPI.getOverlays();
      setOverlays(res);
    }

    getOverlays();
  }, []);

  return (
    <Box w="100%" pb="lg">
      <Settings overlays={overlays} />
    </Box>
  );
}

export default App;
