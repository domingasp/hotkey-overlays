/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Divider, Group, Text, Title } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Check, HelpCircle, Plus, X } from 'react-feather';
import { notifications } from '@mantine/notifications';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Overlay } from '../../../../models/Overlay';
import OverlayConfigurationCard from './components/OverlayConfigurationCard';
import {
  addOverlay,
  deleteOverlay,
  getOverlays,
  updateOverlayOrder,
} from '../../services/HotkeyOverlaysAPI';
import fetchAndSetState from '../../services/utils';
import { channelsToRenderer } from '../../../../shared/channels';
import Notification from '../../../../models/Notification';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function Settings() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  const isShowingUpdateNotif = useRef(false);
  const showingUpdateNotifTimerId = useRef<NodeJS.Timeout | undefined>();

  const grid = 8;

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

  const getItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ): React.CSSProperties => ({
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      overlays,
      result.source.index,
      result.destination.index
    );

    setOverlays(items);
    updateOverlayOrder(items.map((x, i) => ({ id: x.id, order: i + 1 })));
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(dropProvided) => (
            <div
              {...dropProvided.droppableProps}
              ref={dropProvided.innerRef}
              style={{ padding: grid }}
            >
              {overlays.map((overlay, idx) => (
                <Draggable
                  key={overlay.id}
                  draggableId={overlay.id.toString()}
                  index={idx}
                >
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      style={getItemStyle(dragProvided.draggableProps.style)}
                    >
                      <OverlayConfigurationCard
                        overlay={overlay}
                        deleteOverlay={onDelete}
                        draggableHandleProps={dragProvided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default Settings;
