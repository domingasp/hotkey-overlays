import { useEffect, useState } from 'react';
import { Kbd } from '@mantine/core';

function App() {
  const [overlayKeybind, setOverlayKeybind] = useState('NONE');

  useEffect(() => {
    async function getOverlayHotkey() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (window as any).hotkeyOverlaysAPI.getOverlayHotkey();
      setOverlayKeybind(res);
    }

    getOverlayHotkey();
  }, []);

  return (
    <div>
      <Kbd>Ctrl</Kbd>
    </div>
  );
}

export default App;
