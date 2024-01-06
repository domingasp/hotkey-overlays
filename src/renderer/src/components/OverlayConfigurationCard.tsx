import {
  Box,
  Button,
  Group,
  Kbd,
  Paper,
  Skeleton,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { IconPhotoPlus } from '@tabler/icons-react';
import { useState } from 'react';
import Overlay from '../../../shared/types/Overlay';
import DeleteMenu from './DeleteMenu';
import NameInput from './NameInput';

type OverlayConfigurationCardProps = {
  overlay: Overlay;
};
function OverlayConfigurationCard({ overlay }: OverlayConfigurationCardProps) {
  const [name, setName] = useState(overlay.name);
  const [isSavingName, setIsSavingName] = useState(false);

  async function updateOverlayName(id: number) {
    setIsSavingName(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (window as any).hotkeyOverlaysAPI.updateOverlayName(id, name);
    setIsSavingName(false);
  }

  return (
    <Paper bg="dark.6" p="md" radius="md" pos="relative">
      <DeleteMenu
        id={overlay.id}
        pos="absolute"
        top="0.25rem"
        right="0.25rem"
      />

      <Group>
        <Box>
          <Button
            component={Skeleton}
            height={100}
            width={100}
            color="green"
            animate={false}
            pos="relative"
          >
            <IconPhotoPlus
              style={{
                width: rem(32),
                height: rem(32),
                color: 'var(--mantine-color-green-filled)',
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                margin: 'auto',
                zIndex: 50,
              }}
            />
          </Button>
        </Box>

        <Stack gap="xs">
          <NameInput
            value={name}
            setValue={setName}
            isSaving={isSavingName}
            onSave={() => {
              updateOverlayName(overlay.id);
            }}
          />

          <Text size="md">
            <Kbd size="md">Ctrl</Kbd> + <Kbd size="md">Shift</Kbd> +{' '}
            <Kbd size="md">]</Kbd>
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}

export default OverlayConfigurationCard;
