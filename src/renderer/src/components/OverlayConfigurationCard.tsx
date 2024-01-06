import {
  Box,
  Button,
  Group,
  Kbd,
  Paper,
  Skeleton,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { IconPhotoPlus } from '@tabler/icons-react';
import Overlay from '../../../shared/types/Overlay';
import DeleteMenu from './DeleteMenu';

type OverlayConfigurationCardProps = {
  overlay: Overlay;
};
function OverlayConfigurationCard({ overlay }: OverlayConfigurationCardProps) {
  return (
    <Paper bg="dark.6" p="md" radius="md" pos="relative">
      <DeleteMenu
        id={overlay.id}
        pos="absolute"
        top="0.25rem"
        right="0.25rem"
      />

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
