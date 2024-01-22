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
      <Box pos="absolute" top="2.125rem" right="0.6875rem">
        <Clock size={14} />
      </Box>
    </Tooltip>
  );
}

export default AutoTurnOffIndicator;
