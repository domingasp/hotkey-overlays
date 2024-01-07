import {
  Button,
  FileInput,
  Modal,
  rem,
  Image,
  Flex,
  TextInput,
  Stack,
  Group,
  SimpleGrid,
  Text,
  Divider,
  Center,
  ActionIcon,
  LoadingOverlay,
} from '@mantine/core';
import {
  IconDeviceFloppy,
  IconPhotoOff,
  IconPhotoSearch,
  IconX,
} from '@tabler/icons-react';
import { createRef, useEffect, useRef, useState } from 'react';
import HorizontalDividerWithLabel from './HorizontalDividerWithLabel';

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
  const [failedToLoadImage, setFailedToLoadImage] = useState(false);

  const [localDriveValue, setLocalDriveValue] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState<string>('');

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const imagePreviewTimerId = useRef<NodeJS.Timeout>();
  const urlInputFieldRef = createRef<HTMLInputElement>();

  const save = () => {
    const path = localDriveValue?.path ?? urlValue ?? undefined;
    setImagePath(localDriveValue?.path ?? urlValue ?? undefined);
    onSave(path);
  };

  const updateImagePreviewState = (setIsLoading: boolean) => {
    setFailedToLoadImage(false);
    setIsLoadingImage(setIsLoading);

    clearTimeout(imagePreviewTimerId.current);
    imagePreviewTimerId.current = setTimeout(() => {
      setIsLoadingImage(false);
    }, 250);
  };

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrlValue = event.currentTarget.value;
    updateImagePreviewState(newUrlValue.trim().length > 0);
    setUrlValue(newUrlValue);
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
      setUrlValue(imagePath);
    } else {
      // local drive
    }
  }, [imagePath, opened]);

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
              <FileInput
                label="From Local Drive:"
                clearable
                value={localDriveValue}
                onChange={setLocalDriveValue}
                placeholder="Find image"
                leftSection={
                  <IconPhotoSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                leftSectionPointerEvents="none"
              />

              <HorizontalDividerWithLabel
                text="Or"
                pos="absolute"
                top="6px"
                left="48%"
                right="0"
                my="auto"
              />

              <TextInput
                label="From Url:"
                value={urlValue}
                ref={urlInputFieldRef}
                placeholder="https://url..."
                onChange={onChangeUrl}
                rightSection={
                  urlValue.length > 0 && (
                    <ActionIcon
                      color="dark.1"
                      variant="transparent"
                      onClick={() => {
                        urlInputFieldRef.current?.focus();
                        setUrlValue('');
                      }}
                      aria-label="Clear Url Field"
                    >
                      <IconX size={19.6} />
                    </ActionIcon>
                  )
                }
              />
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
                <Center h={194}>
                  <IconPhotoOff
                    color="var(--mantine-color-dark-3)"
                    size={48}
                    stroke={1.5}
                  />
                </Center>
              ) : (
                <Image
                  radius="sm"
                  h={194}
                  w="auto"
                  fit="contain"
                  src={urlValue}
                  onError={() => setFailedToLoadImage(true)}
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
