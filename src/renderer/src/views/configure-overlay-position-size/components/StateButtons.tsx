import { Group, Button, Box } from '@mantine/core';
import { Check, Loader, RotateCcw, X } from 'react-feather';
import { closeConfigureOverlayPositionSizeWindow } from '../../../services/HotkeyOverlaysAPI';

type StateButtonsProps = {
  onDefaults: () => void;
  onReset: () => void;
  onSave: () => void;
};
function StateButtons({ onDefaults, onReset, onSave }: StateButtonsProps) {
  return (
    <Box
      pos="absolute"
      top={10}
      left={0}
      right={0}
      ml="auto"
      mr="auto"
      w={400}
      bg="dark.9"
      style={{ zIndex: 2, borderRadius: 'var(--mantine-radius-sm)' }}
      p="xs"
    >
      <Group align="flex-start">
        <Button
          onClick={() => onDefaults()}
          color="blue"
          size="xs"
          leftSection={<Loader size={14} />}
          variant="light"
        >
          Defaults
        </Button>

        <Button
          onClick={closeConfigureOverlayPositionSizeWindow}
          color="gray"
          size="xs"
          leftSection={<X size={14} />}
          variant="light"
        >
          Cancel
        </Button>

        <Button
          onClick={() => onReset()}
          color="red"
          size="xs"
          leftSection={<RotateCcw size={14} />}
          variant="light"
        >
          Reset
        </Button>

        <Button
          color="green"
          size="xs"
          leftSection={<Check size={14} />}
          onClick={() => onSave()}
          variant="light"
        >
          Save
        </Button>
      </Group>
    </Box>
  );
}

export default StateButtons;
