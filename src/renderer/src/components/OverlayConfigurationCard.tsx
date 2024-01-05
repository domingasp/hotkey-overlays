import {
  ActionIcon,
  Box,
  Button,
  Group,
  Kbd,
  Menu,
  Paper,
  Skeleton,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { IconDots, IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import Overlay from '../../../shared/types/Overlay';

type OverlayConfigurationCardProps = {
  overlay: Overlay;
};
function OverlayConfigurationCard({ overlay }: OverlayConfigurationCardProps) {
  return (
    <Paper bg="dark.6" p="md" radius="md" pos="relative">
      <Menu withinPortal position="left" shadow="sm">
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            color="gray"
            pos="absolute"
            right="0.25rem"
            top="0.25rem"
          >
            <IconDots style={{ width: rem(14), height: rem(14) }} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            style={{ fontSize: '0.8rem' }}
          >
            Delete Overlay
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Group>
        <Box>
          <Button
            component={Skeleton}
            height={100}
            width={100}
            color="green"
            animate={false}
            pos="relative"
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

        <Stack>
          <Text fw="bold">{overlay.name}</Text>

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
