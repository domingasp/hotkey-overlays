import {
  Button,
  Center,
  Flex,
  Group,
  Kbd,
  Overlay,
  Portal,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconRotate2, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useRecordHotkeys } from 'react-hotkeys-hook';
import formatHotkeyShortcut from '../../../shared/utils';

type UpdateHotkeyOverlayProps = {
  opened: boolean;
  close: () => void;
  onSave: (hotkey: string[]) => void;
};
function UpdateHotkeyOverlay({
  opened,
  close,
  onSave,
}: UpdateHotkeyOverlayProps) {
  const MAX_LENGTH = 5;
  const [keys, { start, stop }] = useRecordHotkeys();

  const isValidHotkey = (hotkey: Set<string>) => {
    const hotkeyWithoutModifiers = new Set(hotkey);
    hotkeyWithoutModifiers.delete('ctrl');
    hotkeyWithoutModifiers.delete('shift');
    hotkeyWithoutModifiers.delete('alt');

    return (
      (hotkey.has('ctrl') || hotkey.has('shift') || hotkey.has('alt')) &&
      hotkeyWithoutModifiers.size > 0
    );
  };

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    if (opened) {
      start();
    }
  }, [opened]);

  useEffect(() => {
    if (keys.size >= MAX_LENGTH) {
      stop();
    }
  }, [keys]);

  return (
    <Portal>
      <Overlay blur={2}>
        <Center h="100%">
          <Stack align="center">
            <Text size="sm">Press hotkey combination</Text>

            <Flex justify="center" px="xs" wrap="wrap" rowGap="xs">
              {keys.size === 0 && <Text>...</Text>}
              {formatHotkeyShortcut(Array.from(keys)).map((key, i) => (
                <>
                  <Kbd key={key} size="md">
                    {key}
                  </Kbd>
                  {keys.size > 1 && i < keys.size - 1 ? (
                    <Text mx="0.3125rem"> + </Text>
                  ) : (
                    ''
                  )}
                </>
              ))}
            </Flex>

            <Group>
              <Button
                onClick={close}
                color="gray"
                variant="outline"
                size="xs"
                leftSection={<IconX size={16} />}
                styles={{
                  section: { marginRight: '0.25rem' },
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  stop();
                  start();
                }}
                color="red"
                variant="outline"
                size="xs"
                leftSection={<IconRotate2 size={16} />}
                styles={{
                  section: { marginRight: '0.25rem' },
                }}
              >
                Reset
              </Button>

              <Tooltip
                label={
                  <Text size="xs">
                    Must include a modifier key (<Kbd size="xs">Ctrl</Kbd>,
                    <Kbd size="xs">Shift</Kbd>, or <Kbd size="xs">Alt</Kbd>)
                  </Text>
                }
                multiline
                disabled={isValidHotkey(keys)}
                color="red"
                position="bottom"
                withArrow
              >
                <Button
                  color="green"
                  variant="outline"
                  size="xs"
                  leftSection={<IconCheck size={16} />}
                  styles={{
                    section: { marginRight: '0.25rem' },
                  }}
                  disabled={!isValidHotkey(keys)}
                  onClick={() => onSave(Array.from(keys))}
                >
                  Save
                </Button>
              </Tooltip>
            </Group>
          </Stack>
        </Center>
      </Overlay>
    </Portal>
  );
}

export default UpdateHotkeyOverlay;
