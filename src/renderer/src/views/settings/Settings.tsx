/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Check, HelpCircle, Plus, X } from 'react-feather';
import { notifications } from '@mantine/notifications';
import Overlay from '../../../../models/Overlay';
import OverlayConfigurationCard from './components/OverlayConfigurationCard';
import {
  addOverlay,
  deleteOverlay,
  getOverlays,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';
import { channelsToRenderer } from '../../../../shared/channels';
import Notification from '../../../../models/Notification';

function Settings() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  const isShowingUpdateNotif = useRef(false);
  const showingUpdateNotifTimerId = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    fetchAndSetState(getOverlays(), setOverlays);

    (window as any).hotkeyOverlaysAPI.ipcRenderer.on(
      channelsToRenderer.sendNotification,
      ({ type, message }: Notification) => {
        if (isShowingUpdateNotif.current === false) {
          notifications.show({
            color: type === 'success' ? 'green' : 'red',
            message: <Text size="sm">{message}</Text>,
            withCloseButton: false,
            icon: type === 'success' ? <Check size={14} /> : <X size={14} />,
          });
        }

        isShowingUpdateNotif.current = true;
        showingUpdateNotifTimerId.current = setTimeout(() => {
          isShowingUpdateNotif.current = false;
        }, 2500);
      }
    );

    return () => clearTimeout(showingUpdateNotifTimerId.current);
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
