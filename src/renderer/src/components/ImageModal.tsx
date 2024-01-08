/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  rem,
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
import {
  IconDeviceFloppy,
  IconPhotoCancel,
  IconPhotoOff,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import HorizontalDividerWithLabel from './HorizontalDividerWithLabel';
import UrlInput from './image-configuration/UrlInput';
import LocalDriveInput from './image-configuration/LocalDriveInput';
import CancelConfirmButtons from './CancelConfirmButtons';
import ImagePath from '../../../shared/types/ImagePath';

const fileToBase64 = async (file: File) => {
  const encodedImage: string = await (
    window as any
  ).hotkeyOverlaysAPI.base64FromImagePath(file.path);

  return `data:${file.type};base64, ${encodedImage}`;
};

type ImageModalProps = {
  opened: boolean;
  close: () => void;

  imagePath: ImagePath | undefined;
  setImagePath: (imagePath: ImagePath | undefined) => void;
  onSave: (path: ImagePath | undefined) => void;
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

  const [localDriveValue, setLocalDriveValue] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState<string>('');
  const [imgSrc, setImgSrc] = useState('');

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const save = () => {
    let path: ImagePath | undefined;
    if (localDriveValue) {
      path = {
        path: localDriveValue.path,
        type: localDriveValue.type,
      };
    } else if (urlValue !== '') {
      path = {
        path: urlValue,
        type: 'url',
      };
    }

    setImagePath(path);
    onSave(path);
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
        icon: <IconPhotoCancel style={{ width: rem(14), height: rem(14) }} />,
        autoClose: 3000,
      });
    } else if (payload !== null) {
      setImgSrc(await fileToBase64(payload));
    } else {
      setImgSrc('');
    }

    setLocalDriveValue(file);
  };

  useEffect(() => {
    setFailedToLoadImage(false);

    if (imagePath === undefined) {
      setLocalDriveValue(null);
      setUrlValue('');
      setFailedToLoadImage(true);
    } else if (imagePath.type === 'url') {
      setLocalDriveValue(null);
      setUrlValue(imagePath.path);
    } else {
      setUrlValue('');
    }
  }, [imagePath, opened]);

  useEffect(() => {
    onChangeUrl(urlValue);
  }, [urlValue]);

  useEffect(() => {
    onChangeLocalDrive(localDriveValue);
  }, [localDriveValue]);

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
                variant=""
                withArrow
              >
                <LocalDriveInput
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
              confirmIcon={
                <IconDeviceFloppy size={18} style={{ marginTop: '2px' }} />
              }
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
                  <IconPhotoOff
                    color="var(--mantine-color-dark-3)"
                    size={48}
                    stroke={1.5}
                  />
                </Center>
              )}

              <Image
                h="100%"
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
