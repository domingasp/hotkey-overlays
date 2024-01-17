import { Box, Text, Tooltip } from '@mantine/core';
import { Clock } from 'react-feather';

type AutoTurnOffIndicatorProps = {
  value: string;
};
function AutoTurnOffIndicator({ value }: AutoTurnOffIndicatorProps) {
  return (
    <Tooltip
      label={<Text size="xs">Turns off after | {value}</Text>}
      color="dark"
      position="bottom"
      withArrow
    >
      <Box pos="absolute" top="0.3125rem" right="2.5rem">
        <Clock size={14} />
      </Box>
    </Tooltip>
  );
}

export default AutoTurnOffIndicator;
