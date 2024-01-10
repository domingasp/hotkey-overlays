import { Box, Divider, SimpleGrid, Title } from '@mantine/core';
import { useState, useEffect } from 'react';
import Overlay from '../../../shared/types/Overlay';
import OverlayConfigurationCard from '../components/OverlayConfigurationCard';

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
    <Box w="100%" p="lg" miw="442px">
      <Title order={2}>Overlay Configurations</Title>
      <Divider my="sm" color="gray" />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {overlays.map((overlay) => (
          <OverlayConfigurationCard key={overlay.id} overlay={overlay} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Settings;
