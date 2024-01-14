/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { HelpCircle, Plus } from 'react-feather';
import Overlay from '../../../../models/Overlay';
import OverlayConfigurationCard from './components/OverlayConfigurationCard';
import {
  addOverlay,
  deleteOverlay,
  getOverlays,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';

function Settings() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  useEffect(() => {
    fetchAndSetState(getOverlays(), setOverlays);
  }, []);

  const onAdd = async () => {
    await addOverlay();
    fetchAndSetState(getOverlays(), setOverlays);
  };

  const onDelete = async (id: number) => {
    await deleteOverlay(id);
    fetchAndSetState(getOverlays(), setOverlays);
  };

  return (
    <Box w="100%" p="lg" miw="442px" pos="relative" mah={750}>
      <Group justify="space-between">
        <Title order={2}>Overlay Configurations</Title>
        <Button
          variant="light"
          color="green"
          size="xs"
          leftSection={<Plus size={18} />}
          styles={{
            section: {
              marginRight: '0.3125rem',
            },
          }}
          onClick={onAdd}
        >
          Add
        </Button>
      </Group>
      <Divider my="sm" color="gray" />

      {overlays.length === 0 && (
        <Alert
          icon={<HelpCircle size={16} />}
          color="gray"
          styles={{
            wrapper: { justifyContent: 'center', alignItems: 'center' },
            body: { flex: 'initial' },
          }}
        >
          No configured Overlays
        </Alert>
      )}

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
            deleteOverlay={onDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Settings;
