/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  Image,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Divider,
  Center,
  LoadingOverlay,
  Tooltip,
} from '@mantine/core';
import { AlertTriangle, HelpCircle, Save, CameraOff } from 'react-feather';
import { createRef, useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import HorizontalDividerWithLabel from '../../../../components/HorizontalDividerWithLabel';
import UrlInput from './UrlInput';
import LocalDriveInput from './LocalDriveInput';
import CancelConfirmButtons from '../../../../components/CancelConfirmButtons';
import ImagePath from '../../../../../../models/ImagePath';
import fetchAndSetState from '../../../../services/utils';
import { fileToBase64 } from '../../../../services/HotkeyOverlaysAPI';
import Size from '../../../../../../models/Size';

type ImageModalProps = {
  opened: boolean;
  close: () => void;

  imagePath: ImagePath | undefined;
  setImagePath: (imagePath: ImagePath | undefined) => void;
  onSave: (path: ImagePath | undefined, size: Size) => void;
};
function ImageModal({
  opened,
  close,
  imagePath,
  setImagePath,
  onSave,
}: ImageModalProps) {
  const acceptedImageFileTypes = 'image/png,image/jpeg,image/svg+xml,image/gif';

  const [failedToLoadImage, setFailedToLoadImage] = useState(false);

  const [initialLocalDriveValueLabel, setInitialLocalDriveValueLabel] =
    useState('');
  const [localDriveValue, setLocalDriveValue] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState<string>('');
  const [imgSrc, setImgSrc] = useState('');

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const imageRef = createRef<HTMLImageElement>();

  const save = () => {
    let path: ImagePath | undefined;
    if (localDriveValue) {
      if (localDriveValue.path !== '') {
        path = {
          path: localDriveValue.path,
          type: localDriveValue.type,
        };
      } else if (imagePath) {
        path = {
          path: imagePath.path,
          type: imagePath.type,
        };
      }
    } else if (urlValue !== '') {
      path = {
        path: urlValue,
        type: 'url',
      };
    }

    setImagePath(path);

    if (imageRef.current) {
      const size = imageRef.current?.getBoundingClientRect();
      onSave(path, { width: size.width, height: size.height });
    }
  };

  const onChangeUrl = (newUrl: string) => {
    setIsLoadingImage(true);
    setUrlValue(newUrl);
    setImgSrc(newUrl);
  };

  const onChangeLocalDrive = async (payload: File | null) => {
    let file = payload;

    if (payload !== null && !acceptedImageFileTypes.includes(payload.type)) {
      file = null;
      notifications.clean();
      notifications.show({
        color: 'red',
        message: 'Unsupported image type',
        withCloseButton: false,
        icon: <AlertTriangle size={16} />,
        autoClose: 3000,
      });
    } else if (payload !== null) {
      fetchAndSetState(fileToBase64(payload.path, payload.type), setImgSrc);
    } else {
      setImgSrc('');
    }

    setLocalDriveValue(file);
  };

  useEffect(() => {
    if (imgSrc === undefined || imgSrc === '') {
      setFailedToLoadImage(false);
    }

    if (imagePath === undefined) {
      setLocalDriveValue(null);
      setUrlValue('');
      setFailedToLoadImage(true);
    } else if (imagePath.type === 'url') {
      setLocalDriveValue(null);
      setUrlValue(imagePath.path);
    } else {
      setUrlValue('');
      setLocalDriveValue(new File([], ''));
      setInitialLocalDriveValueLabel(imagePath.path.split('\\').pop() ?? '');

      if (opened || localDriveValue?.path !== '') {
        fetchAndSetState(
          fileToBase64(imagePath.path, imagePath.type),
          setImgSrc
        );
      }

      if (!opened && localDriveValue?.path === '') {
        notifications.clean();
      }
    }
  }, [imagePath, opened]);

  useEffect(() => {
    onChangeUrl(urlValue);
  }, [urlValue]);

  useEffect(() => {
    if (initialLocalDriveValueLabel !== '' && localDriveValue?.path !== '') {
      setInitialLocalDriveValueLabel('');
      onChangeLocalDrive(localDriveValue);
    }
  }, [localDriveValue]);

  useEffect(() => {
    if (opened && imagePath?.type !== 'url' && imgSrc.includes('undefined')) {
      notifications.clean();
      notifications.show({
        color: 'red',
        message: 'Image not found',
        withCloseButton: false,
        icon: <HelpCircle size={16} />,
        autoClose: 3000,
      });
    }
  }, [imgSrc]);

  return (
    <Modal.Root opened={opened} onClose={close} centered>
      <Modal.Overlay backgroundOpacity={0.55} blur={2} />
      <Modal.Content maw={398}>
        <Modal.Header>
          <Modal.Title fw="bold">Configure Image</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <SimpleGrid pos="relative" cols={2} spacing="3rem">
              <Tooltip
                label={<Text size="xs">Url field must be empty</Text>}
                disabled={urlValue === ''}
                color="red"
                position="bottom"
                withArrow
              >
                <LocalDriveInput
                  initialValueLabel={initialLocalDriveValueLabel}
                  value={localDriveValue}
                  onChange={onChangeLocalDrive}
                  acceptedFileTypes={acceptedImageFileTypes}
                  disabled={urlValue !== ''}
                />
              </Tooltip>

              <HorizontalDividerWithLabel
                text="Or"
                pos="absolute"
                top="6px"
                left="48%"
                right="0"
                my="auto"
              />

              <Tooltip
                label={<Text size="xs">Local Drive field must be empty</Text>}
                disabled={localDriveValue === null}
                color="red"
                position="bottom"
                withArrow
              >
                <UrlInput
                  value={urlValue}
                  setValue={setUrlValue}
                  onChange={onChangeUrl}
                  disabled={localDriveValue !== null}
                />
              </Tooltip>
            </SimpleGrid>

            <CancelConfirmButtons
              onCancel={close}
              onConfirm={save}
              confirmIcon={<Save size={16} />}
              confirmDisabled={isLoadingImage || failedToLoadImage}
            />

            <Divider size="md" label={<Text size="xs">Image Preview</Text>} />

            <Flex
              justify="center"
              bg="dark.8"
              p={6}
              pos="relative"
              style={{
                borderRadius: 'var(--mantine-radius-sm)',
              }}
              h={211}
            >
              <LoadingOverlay
                visible={isLoadingImage}
                overlayProps={{
                  backgroundOpacity: 1,
                  color: 'var(--mantine-color-dark-8)',
                  radius: 'sm',
                }}
                loaderProps={{ color: 'green' }}
              />

              {failedToLoadImage && (
                <Center h="100%">
                  <CameraOff color="var(--mantine-color-dark-3)" size={32} />
                </Center>
              )}

              <Image
                ref={imageRef}
                h={200}
                fit="contain"
                src={imgSrc}
                onLoad={() => {
                  setIsLoadingImage(false);
                  setFailedToLoadImage(false);
                }}
                onError={() => {
                  setIsLoadingImage(false);
                  setFailedToLoadImage(true);
                }}
              />
            </Flex>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ImageModal;
