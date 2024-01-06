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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDeviceFloppy,
  IconPhotoPlus,
  IconPhotoSearch,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import HorizontalDividerWithLabel from './HorizontalDividerWithLabel';

function ImageModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [failedToLoadImage, setFailedToLoadImage] = useState(false);
  const [localDriveValue, setLocalDriveValue] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(localDriveValue?.path);
  }, [localDriveValue]);

  useEffect(() => {
    console.log(urlValue);
  }, [urlValue]);

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
                  onChange={(event) => setUrlValue(event.currentTarget.value)}
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
                >
                  Save
                </Button>
              </Group>

              <Divider size="md" label={<Text size="xs">Image Preview</Text>} />

              <Flex
                justify="center"
                bg="dark.8"
                p="xs"
                style={{ borderRadius: 'var(--mantine-radius-sm)' }}
              >
                <Image
                  radius="sm"
                  h={194}
                  w="auto"
                  fit="contain"
                  src="https://c8.alamy.com/comp/2PJK4N2/instagram-icon-vector-instagram-icon-design-social-media-icons-design-2PJK4N2.jpg"
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
