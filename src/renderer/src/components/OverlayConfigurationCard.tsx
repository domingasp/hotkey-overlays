/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Group,
  Kbd,
  Paper,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import Overlay from '../../../shared/types/Overlay';
import DeleteMenu from './DeleteMenu';
import NameInput from './NameInput';
import ImageModal from './ImageModal';
import ImagePath from '../../../shared/types/ImagePath';
import ConfigureImageButton from './ConfigureImageButton';
import '../styles/configureHotkeyButton.css';
import UpdateHotkeyOverlay from './UpdateHotkeyOverlay';

type OverlayConfigurationCardProps = {
  overlay: Overlay;
};
function OverlayConfigurationCard({ overlay }: OverlayConfigurationCardProps) {
  const [name, setName] = useState(overlay.name);

  const [imageModalOpened, { open: openImageModel, close: closeImageModel }] =
    useDisclosure(false);
  const [imagePath, setImagePath] = useState(overlay.imagePath);

  const [
    hotkeyOverlayOpened,
    { open: openHotkeyOverlay, close: closeHotkeyOverlay },
  ] = useDisclosure(false);

  const [isSavingName, setIsSavingName] = useState(false);

  async function updateOverlayName() {
    setIsSavingName(true);
    await (window as any).hotkeyOverlaysAPI.updateOverlayName(overlay.id, name);
    setIsSavingName(false);
  }

  async function updateOverlayImage(path: ImagePath | undefined) {
    await (window as any).hotkeyOverlaysAPI.updateOverlayImage(
      overlay.id,
      path
    );
    closeImageModel();

    notifications.clean();
    notifications.show({
      color: 'green',
      message: (
        <Text size="sm">
          Updated image for{' '}
          <Text span fw="bold">
            {name}
          </Text>
        </Text>
      ),
      withCloseButton: false,
      icon: (
        <IconCheck stroke={4} style={{ width: rem(14), height: rem(14) }} />
      ),
    });
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
        <ConfigureImageButton imagePath={imagePath} onClick={openImageModel} />

        <ImageModal
          opened={imageModalOpened}
          close={closeImageModel}
          imagePath={imagePath}
          setImagePath={setImagePath}
          onSave={(path) => updateOverlayImage(path)}
        />

        {hotkeyOverlayOpened && (
          <UpdateHotkeyOverlay
            opened={hotkeyOverlayOpened}
            close={closeHotkeyOverlay}
          />
        )}

        <Stack gap="xs">
          <NameInput
            value={name}
            setValue={setName}
            isSaving={isSavingName}
            onSave={() => updateOverlayName()}
          />

          <Tooltip
            label={<Text size="xs">Edit Hotkey</Text>}
            color="blue"
            position="bottom"
            withArrow
          >
            <UnstyledButton
              aria-label="Change Hotkey"
              className="configure-hotkey-btn"
              onClick={openHotkeyOverlay}
            >
              <Kbd size="md">Ctrl</Kbd> + <Kbd size="md">Ctrl</Kbd>
            </UnstyledButton>
          </Tooltip>
        </Stack>
      </Group>
    </Paper>
  );
}

export default OverlayConfigurationCard;
