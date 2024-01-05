import { useEffect, useState } from 'react';
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
    <div>
      <Settings overlays={overlays} />
    </div>
  );
}

export default App;
