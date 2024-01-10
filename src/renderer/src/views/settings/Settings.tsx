/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Title,
  rem,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconPlus } from '@tabler/icons-react';
import Overlay from '../../../../shared/types/Overlay';
import OverlayConfigurationCard from './components/OverlayConfigurationCard';

function Settings() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  async function getOverlays() {
    const res = await (window as any).hotkeyOverlaysAPI.getOverlays();
    setOverlays(res);
  }

  async function addOverlay() {
    await (window as any).hotkeyOverlaysAPI.addOverlay();
    getOverlays();
  }

  async function deleteOverlay(id: number) {
    await (window as any).hotkeyOverlaysAPI.deleteOverlay(id);
    getOverlays();
  }

  useEffect(() => {
    getOverlays();
  }, []);

  return (
    <Box w="100%" p="lg" miw="442px" pos="relative" mah={750}>
      <Group justify="space-between">
        <Title order={2}>Overlay Configurations</Title>
        <Button
          variant="light"
          color="green"
          size="xs"
          leftSection={
            <IconPlus stroke={3} style={{ width: rem(14), height: rem(14) }} />
          }
          styles={{
            section: {
              marginRight: '0.3125rem',
            },
          }}
          onClick={() => addOverlay()}
        >
          Add
        </Button>
      </Group>
      <Divider my="sm" color="gray" />
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        mah={540}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {overlays.map((overlay) => (
          <OverlayConfigurationCard
            key={overlay.id}
            overlay={overlay}
            deleteOverlay={(id) => deleteOverlay(id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Settings;
