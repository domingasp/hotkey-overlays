/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mantine/core';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Move } from 'react-feather';

type MoveHandleProps = {
  draggableHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
function MoveHandle({ draggableHandleProps }: MoveHandleProps) {
  return (
    <Box
      {...draggableHandleProps}
      pos="absolute"
      bottom="0.5rem"
      right="0.6875rem"
    >
      <Move size={14} />
    </Box>
  );
}

export default MoveHandle;
