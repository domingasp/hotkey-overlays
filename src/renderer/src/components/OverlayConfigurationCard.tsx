import { Group, Kbd, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import Overlay from '../../../shared/types/Overlay';
import DeleteMenu from './DeleteMenu';
import NameInput from './NameInput';
import ImageModal from './ImageModal';

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
        <ImageModal />

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
