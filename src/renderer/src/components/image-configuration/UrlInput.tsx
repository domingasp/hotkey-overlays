import { ActionIcon, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { createRef, forwardRef, useImperativeHandle } from 'react';

type UrlInputProps = {
  value: string;
  setValue: (newVal: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  disabled?: boolean;
};
const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(function UrlInput(
  { value, setValue, onChange, disabled = false }: UrlInputProps,
  ref
) {
  const fieldRef = createRef<HTMLInputElement>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => fieldRef.current!, []);

  return (
    <TextInput
      label="From Url:"
      value={value}
      ref={fieldRef}
      placeholder="https://url..."
      onChange={onChange}
      rightSection={
        value.length > 0 && (
          <ActionIcon
            color="dark.1"
            variant="transparent"
            onClick={() => {
              fieldRef.current?.focus();
              setValue('');
            }}
            aria-label="Clear Url Field"
            disabled={disabled}
          >
            <IconX size={19.6} />
          </ActionIcon>
        )
      }
      disabled={disabled}
    />
  );
});

export default UrlInput;
