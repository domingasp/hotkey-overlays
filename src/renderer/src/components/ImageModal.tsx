/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FileInput,
  Modal,
  rem,
  Image,
  Flex,
  Stack,
  Group,
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
  IconPhotoSearch,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import HorizontalDividerWithLabel from './HorizontalDividerWithLabel';
import UrlInput from './image-configuration/UrlInput';
import LocalDriveInput from './image-configuration/LocalDriveInput';

const filePathToUrl = async (path: string, type: string) => {
  const encodedImage: string = await (
    window as any
  ).hotkeyOverlaysAPI.base64FromImagePath(path);

  return `data:${type};base64, ${encodedImage}`;
};

type ImageModalProps = {
  opened: boolean;
  close: () => void;

  imagePath: string | undefined;
  setImagePath: (imagePath: string | undefined) => void;
  onSave: (path: string | undefined) => void;
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
  const imagePreviewTimerId = useRef<NodeJS.Timeout>();

  const save = () => {
    const path = localDriveValue?.path ?? urlValue ?? undefined;
    setImagePath(localDriveValue?.path ?? urlValue ?? undefined);
    onSave(path);
  };

  const updateImagePreviewState = (
    setIsLoading: boolean,
    loadingTimeout = 5000
  ) => {
    setFailedToLoadImage(false);
    setIsLoadingImage(setIsLoading);

    clearTimeout(imagePreviewTimerId.current);
    imagePreviewTimerId.current = setTimeout(() => {
      setIsLoadingImage(false);
    }, loadingTimeout);
  };

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrlValue = event.currentTarget.value;
    updateImagePreviewState(newUrlValue.trim().length > 0);
    setUrlValue(newUrlValue);
  };

  const onChangeLocalDrive = (payload: File | null) => {
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
      filePathToUrl(payload.path, payload.type);
    }

    setLocalDriveValue(file);
  };

  useEffect(() => {
    return () => clearTimeout(imagePreviewTimerId.current);
  }, []);

  useEffect(() => {
    setFailedToLoadImage(false);

    if (imagePath === undefined) {
      setLocalDriveValue(null);
      setUrlValue('');
      setFailedToLoadImage(true);
    } else if (imagePath.startsWith('http')) {
      setLocalDriveValue(null);
      setUrlValue(imagePath);
    } else {
      setUrlValue('');
    }
  }, [imagePath, opened]);

  useEffect(() => {
    setImgSrc(urlValue);
  }, [urlValue]);

  useEffect(() => {
    async function base64Image() {
      let newImgSrc = null;
      if (localDriveValue) {
        newImgSrc = await filePathToUrl(
          localDriveValue.path,
          localDriveValue.type
        );
        updateImagePreviewState(true, 250);
      }

      setImgSrc(newImgSrc ?? '');
    }

    base64Image();
  }, [localDriveValue]);

  return (
    <Modal.Root opened={opened} onClose={close} centered>
      <Modal.Overlay backgroundOpacity={0.55} blur={2} />
      <Modal.Content>
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

            <Group justify="space-between">
              <Button variant="default" onClick={close} size="sm">
                Cancel
              </Button>

              <Button
                variant="light"
                color="green"
                leftSection={
                  <IconDeviceFloppy size={18} style={{ marginTop: '2px' }} />
                }
                onClick={save}
                disabled={isLoadingImage || failedToLoadImage}
              >
                Save
              </Button>
            </Group>

            <Divider size="md" label={<Text size="xs">Image Preview</Text>} />

            <Flex
              justify="center"
              bg="dark.8"
              p="xs"
              pos="relative"
              style={{
                borderRadius: 'var(--mantine-radius-sm)',
              }}
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

              {failedToLoadImage ? (
                <Center h={218}>
                  <IconPhotoOff
                    color="var(--mantine-color-dark-3)"
                    size={48}
                    stroke={1.5}
                  />
                </Center>
              ) : (
                <Image
                  radius="sm"
                  h={218}
                  w="auto"
                  fit="contain"
                  src={imgSrc}
                  onError={() => {
                    setIsLoadingImage(false);
                    setFailedToLoadImage(true);
                  }}
                />
              )}
            </Flex>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ImageModal;
