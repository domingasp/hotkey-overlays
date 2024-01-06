/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [imagePath, setImagePath] = useState(overlay.imagePath);

  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);

  async function updateOverlayName() {
    setIsSavingName(true);
    await (window as any).hotkeyOverlaysAPI.updateOverlayName(overlay.id, name);
    setIsSavingName(false);
  }

  async function updateOverlayImage(path: string | undefined) {
    setIsSavingImage(true);
    await (window as any).hotkeyOverlaysAPI.updateOverlayImage(
      overlay.id,
      path
    );
    setIsSavingImage(false);
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
        <ImageModal
          imagePath={imagePath}
          setImagePath={setImagePath}
          onSave={(path) => updateOverlayImage(path)}
        />

        <Stack gap="xs">
          <NameInput
            value={name}
            setValue={setName}
            isSaving={isSavingName}
            onSave={() => updateOverlayName()}
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
