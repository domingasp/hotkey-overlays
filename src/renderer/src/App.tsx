import { useEffect, useState } from 'react';
import { Kbd } from '@mantine/core';
import Overlay from '../../shared/types/Overlay';

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
    <div>
      <Kbd>{overlays.length}</Kbd>
    </div>
  );
}

export default App;
