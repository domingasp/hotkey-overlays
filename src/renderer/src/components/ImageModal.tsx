import {
  Box,
  Button,
  FileInput,
  Modal,
  Skeleton,
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDeviceFloppy,
  IconPhotoOff,
  IconPhotoPlus,
  IconPhotoSearch,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import HorizontalDividerWithLabel from './HorizontalDividerWithLabel';

type ImageModalProps = {
  imagePath: string | undefined;
  setImagePath: (imagePath: string | undefined) => void;
  onSave: (path: string | undefined) => void;
};
function ImageModal({ imagePath, setImagePath, onSave }: ImageModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [failedToLoadImage, setFailedToLoadImage] = useState(false);

  const [localDriveValue, setLocalDriveValue] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState<string>('');

  const save = () => {
    const path = localDriveValue?.path ?? urlValue ?? undefined;
    setImagePath(localDriveValue?.path ?? urlValue ?? undefined);
    onSave(path);
  };

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
    <>
      <Box>
        <Button
          component={Skeleton}
          height={100}
          width={100}
          color="green"
          animate={false}
          pos="relative"
          onClick={open}
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
                  placeholder="https://url..."
                  onChange={(event) => {
                    setFailedToLoadImage(false);
                    setUrlValue(event.currentTarget.value);
                  }}
                  rightSection={
                    urlValue.length > 0 && (
                      <ActionIcon
                        color="dark.1"
                        variant="transparent"
                        onClick={() => setUrlValue('')}
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
                  disabled={localDriveValue === null && urlValue.length === 0}
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
                {failedToLoadImage && (
                  <Center>
                    <IconPhotoOff
                      color="var(--mantine-color-dark-3)"
                      size={48}
                      stroke={1.5}
                    />
                  </Center>
                )}
                <Image
                  radius="sm"
                  h={194}
                  w="auto"
                  fit="contain"
                  src={urlValue}
                  onError={() => setFailedToLoadImage(true)}
                />
              </Flex>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

export default ImageModal;
