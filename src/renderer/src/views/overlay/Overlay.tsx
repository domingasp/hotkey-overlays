/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center } from '@mantine/core';
import { channelsToRenderer } from '../../../../shared/channels';
import { Overlay as OverlayType } from '../../../../models/Overlay';
import { getOverlay } from '../../services/HotkeyOverlaysAPI';
import OverlayRender from './overlay-render/OverlayRender';

function Overlay() {
  const [visibleOverlays, setVisibleOverlays] = useState<OverlayType[]>([]);

  const overlayToggled = (overlay: OverlayType) => {
    const overlayIdx = visibleOverlays.findIndex((x) => x.id === overlay.id);

    if (overlayIdx === -1) {
      setVisibleOverlays((curr) => [...curr, overlay]);
    } else {
      const spliced = visibleOverlays.slice();
      spliced.splice(overlayIdx, 1);
      setVisibleOverlays(spliced);
    }
  };

  const removeOverlay = (id: number) => {
    const overlayIdx = visibleOverlays.findIndex((x) => x.id === id);
    if (overlayIdx !== -1) {
      const spliced = visibleOverlays.slice();
      spliced.splice(overlayIdx, 1);
      setVisibleOverlays(spliced);
    }
  };

  useEffect(() => {
    (window as any).hotkeyOverlaysAPI.ipcRenderer.on(
      channelsToRenderer.toggleOverlay,
      async (id: number) => {
        const overlay = await getOverlay(id);
        overlayToggled(overlay);
      }
    );

    (window as any).hotkeyOverlaysAPI.ipcRenderer.on(
      channelsToRenderer.overlayDeleted,
      async (id: number) => {
        removeOverlay(id);
      }
    );

    return () => {
      (window as any).hotkeyOverlaysAPI.ipcRenderer.removeAllListeners(
        channelsToRenderer.toggleOverlay
      );
      (window as any).hotkeyOverlaysAPI.ipcRenderer.removeAllListeners(
        channelsToRenderer.overlayDeleted
      );
    };
  }, [visibleOverlays]);

  return (
    <Center h="100%" style={{ overflow: 'hidden', position: 'relative' }}>
      {visibleOverlays.map((overlay) => (
        <OverlayRender
          key={overlay.id}
          overlay={overlay}
          onAutoTurnOff={() => overlayToggled(overlay)}
        />
      ))}
    </Center>
  );
}

export default Overlay;
