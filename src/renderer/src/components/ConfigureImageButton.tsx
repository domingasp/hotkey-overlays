import { Box, Button, Skeleton, rem } from '@mantine/core';
import { IconPhotoPlus } from '@tabler/icons-react';
import ImagePath from '../../../shared/types/ImagePath';

type ConfigureImageButtonProps = {
  imagePath: ImagePath | undefined;
  onClick: () => void;
};
function ConfigureImageButton({
  imagePath,
  onClick,
}: ConfigureImageButtonProps) {
  return (
    <Box>
      <Button
        component={Skeleton}
        height={100}
        width={100}
        color="green"
        animate={false}
        pos="relative"
        onClick={onClick}
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
  );
}

export default ConfigureImageButton;
