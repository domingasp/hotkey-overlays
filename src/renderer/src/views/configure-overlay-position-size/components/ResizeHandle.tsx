/* eslint-disable react/jsx-props-no-spreading */
import { Box, Divider, Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { ZoomIn, ZoomOut } from 'react-feather';

const ResizeHandle = forwardRef<HTMLDivElement>(function ResizeHandle(
  props,
  ref
) {
  return (
    <Box
      ref={ref}
      {...props}
      pos="fixed"
      top="50%"
      left={25}
      bg="dark.7"
      style={{
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        borderRadius: 'var(--mantine-radius-xl)',
      }}
    >
      <Stack pos="relative" gap="xs" justify="center" p="sm">
        <ZoomOut color="white" />
        <Divider
          c="red"
          size="md"
          orientation="vertical"
          h="50px"
          variant="dashed"
          style={{ alignSelf: 'center' }}
        />
        <ZoomIn color="white" />
        <Text pos="absolute" left={60} miw={50} size="sm" fs="italic">
          Click and drag
        </Text>
      </Stack>
    </Box>
  );
});

export default ResizeHandle;
