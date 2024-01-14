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
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import Overlay from '../../../../shared/types/Overlay';
import OverlayConfigurationCard from './components/OverlayConfigurationCard';
import 'react-resizable/css/styles.css';

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

  // TRAIL
  const [sizze, setSizze] = useState({ width: 200, height: 200 });
  const [poss, setPoss] = useState({ x: 20, y: 30 });

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
          onClick={() => addOverlay()}
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

      {/* TRIALING RESIZABLE ELEMENT */}
      <Draggable
        handle=".handle"
        defaultPosition={poss}
        grid={[5, 5]}
        onStop={(_e, { x, y }) => {
          setPoss({ x, y });
        }}
      >
        <ResizableBox
          height={sizze.height}
          width={sizze.width}
          onResize={(_event, { size }) => {
            setSizze({ width: size.width, height: size.height });
          }}
          lockAspectRatio
        >
          <Alert h="100%">
            <div className="handle">ONLY THIS</div>
            {sizze.height} * {sizze.width} : x{poss.x} y{poss.y}
          </Alert>
        </ResizableBox>
      </Draggable>
      {/* END OF RESIZABLE */}

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
