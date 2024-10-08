/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Flex,
  Group,
  Kbd,
  Paper,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Check, Maximize } from 'react-feather';
import { notifications } from '@mantine/notifications';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Overlay } from '../../../../../models/Overlay';
import NameInput from './configure-name/NameInput';
import ImageModal from './configure-image/ImageModal';
import ImagePath from '../../../../../models/ImagePath';
import ConfigureImageButton from './configure-image/ConfigureImageButton';
import UpdateHotkeyOverlay from './configure-hotkey/UpdateHotkeyOverlay';
import formatHotkeyShortcut, {
  electronHotkeyToKeys,
} from '../../../../../shared/utils';
import './styles/configureHotkeyButton.css';
import {
  openConfigureOverlayPositionSize,
  registerOverlayHotkeys,
  unregisterOverlayHotkeys,
  updateOverlayAutoTurnOff,
  updateOverlayHotkey,
  updateOverlayImage,
  updateOverlayName,
} from '../../../services/HotkeyOverlaysAPI';
import Size from '../../../../../models/Size';
import ActionsMenu from './actions-menu/ActionsMenu';
import ConfigureAutoTurnOff from './configure-auto-turn-off/ConfigureAutoTurnOff';
import AutoTurnOffIndicator from './configure-auto-turn-off/AutoTurnOffIndicator';
import MoveHandle from './move-handle/MoveHandle';

type OverlayConfigurationCardProps = {
  overlay: Overlay;
  deleteOverlay: (id: number) => void;
  draggableHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
function OverlayConfigurationCard({
  overlay,
  deleteOverlay,
  draggableHandleProps,
}: OverlayConfigurationCardProps) {
  const [name, setName] = useState(overlay.name);

  const [imageModalOpened, { open: openImageModel, close: closeImageModel }] =
    useDisclosure(false);
  const [imagePath, setImagePath] = useState(overlay.imagePath);

  const [hotkey, setHotkey] = useState<string[]>(
    electronHotkeyToKeys(overlay.hotkey)
  );

  const [
    hotkeyOverlayOpened,
    { open: openHotkeyOverlay, close: closeHotkeyOverlay },
  ] = useDisclosure(false);

  const [
    autoTurnOffModalOpened,
    { open: openAutoTurnOffModel, close: closeAutoTurnOffModel },
  ] = useDisclosure(false);
  const [autoTurnOffValue, setAutoTurnOffValue] = useState<string | undefined>(
    overlay.autoTurnOff
  );

  const [isSavingName, setIsSavingName] = useState(false);

  const onUpdateName = async (overlayId: number, newName: string) => {
    setIsSavingName(true);
    await updateOverlayName(overlayId, newName);
    setIsSavingName(false);
  };

  const onUpdateImage = async (
    overlayId: number,
    newImagePath: ImagePath | undefined,
    initialSize: Size
  ) => {
    await updateOverlayImage(overlayId, newImagePath, initialSize);

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
      icon: <Check size={14} />,
    });
  };

  async function onUpdateHotkey(overlayId: number, newHotkey: string[]) {
    closeHotkeyOverlay();
    setHotkey(newHotkey);
    const electronMappedHotkey = formatHotkeyShortcut(newHotkey, true);

    await updateOverlayHotkey(overlayId, electronMappedHotkey.join('+'));
  }

  async function onUpdateOverlayAutoTurnOff(overlayId: number, time: string) {
    await updateOverlayAutoTurnOff(overlayId, time);
    setAutoTurnOffValue(time);

    closeAutoTurnOffModel();
  }

  const renderHotkey = (keysToRender: string[]) => {
    return (
      <Flex justify="center" wrap="wrap" rowGap="xs" maw="202px">
        {formatHotkeyShortcut(keysToRender).map((key, i) => (
          <React.Fragment key={key}>
            <Kbd size="sm">{key}</Kbd>
            {keysToRender.length > 1 && i < keysToRender.length - 1 ? (
              <Text mx="0.3125rem"> + </Text>
            ) : (
              ''
            )}
          </React.Fragment>
        ))}
      </Flex>
    );
  };

  useEffect(() => {
    if (hotkeyOverlayOpened) {
      unregisterOverlayHotkeys();
    } else {
      registerOverlayHotkeys();
    }
  }, [hotkeyOverlayOpened]);

  return (
    <Paper bg="dark.6" p="md" radius="md" pos="relative">
      <ActionsMenu
        onAutoTurnOff={() => openAutoTurnOffModel()}
        onDelete={() => deleteOverlay(overlay.id)}
        pos="absolute"
        top="0.25rem"
        right="0.25rem"
      />

      {autoTurnOffValue && autoTurnOffValue !== '00:00:00' && (
        <AutoTurnOffIndicator value={autoTurnOffValue} />
      )}
      <ConfigureAutoTurnOff
        opened={autoTurnOffModalOpened}
        close={closeAutoTurnOffModel}
        value={autoTurnOffValue}
        onSave={(value: string) =>
          onUpdateOverlayAutoTurnOff(overlay.id, value)
        }
      />

      <MoveHandle draggableHandleProps={draggableHandleProps} />

      <Group>
        <Tooltip
          label={<Text size="xs">Configure position and size</Text>}
          color="blue"
          position="bottom"
          disabled={imagePath === undefined}
          withArrow
        >
          <ActionIcon
            h="unset"
            style={{ alignSelf: 'stretch' }}
            aria-label="Adjust overlay position and size"
            disabled={imagePath === undefined}
            onClick={() => openConfigureOverlayPositionSize(overlay.id)}
          >
            <Maximize size={14} strokeWidth={3} />
          </ActionIcon>
        </Tooltip>

        <ConfigureImageButton imagePath={imagePath} onClick={openImageModel} />

        <ImageModal
          opened={imageModalOpened}
          close={closeImageModel}
          imagePath={imagePath}
          setImagePath={setImagePath}
          onSave={(path, size) => onUpdateImage(overlay.id, path, size)}
        />

        {hotkeyOverlayOpened && (
          <UpdateHotkeyOverlay
            opened={hotkeyOverlayOpened}
            close={closeHotkeyOverlay}
            onSave={(newHotkey) => onUpdateHotkey(overlay.id, newHotkey)}
          />
        )}

        <Stack gap="xs">
          <NameInput
            value={name}
            setValue={setName}
            isSaving={isSavingName}
            onSave={() => onUpdateName(overlay.id, name)}
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
              {renderHotkey(hotkey)}
            </UnstyledButton>
          </Tooltip>
        </Stack>
      </Group>
    </Paper>
  );
}

export default OverlayConfigurationCard;
