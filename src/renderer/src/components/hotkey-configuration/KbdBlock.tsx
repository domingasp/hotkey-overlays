import { Kbd } from '@mantine/core';
import { ReactNode } from 'react';

type KbdBlockProps = {
  children: ReactNode;
};
function KbdBlock({ children }: KbdBlockProps) {
  return (
    <Kbd
      size="md"
      display="inline-block"
      h="1.75rem"
      lh="1.25rem"
      mr="0.0625rem"
      mb="0.0625rem"
    >
      {children}
    </Kbd>
  );
}

export default KbdBlock;
