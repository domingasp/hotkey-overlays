/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import {
  Divider,
  MantineSize,
  MantineSpacing,
  Stack,
  StackProps,
  Text,
} from '@mantine/core';

interface HorizontalDividerWithLabelProps extends StackProps {
  text: string;
  textSize?: string | MantineSize;
  marginLeftDividers?: string | MantineSpacing;
}
function HorizontalDividerWithLabel({
  text = 'Label',
  textSize = 'xs',
  marginLeftDividers = '6px',
  ...props
}: HorizontalDividerWithLabelProps) {
  return (
    <Stack justify="center" gap="2px" {...props}>
      <Divider
        color="gray.7"
        orientation="vertical"
        h="20px"
        ml={marginLeftDividers}
      />
      <Text c="gray.5" size={textSize} fs="italic">
        {text}
      </Text>
      <Divider
        color="gray.7"
        orientation="vertical"
        h="20px"
        ml={marginLeftDividers}
      />
    </Stack>
  );
}

export default HorizontalDividerWithLabel;
