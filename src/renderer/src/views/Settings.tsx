import { Kbd } from '@mantine/core';
import { useState, useEffect } from 'react';
import Overlay from '../../../shared/types/Overlay';

function Settings() {
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
      settings <Kbd>{overlays.length}</Kbd>
    </div>
  );
}

export default Settings;
