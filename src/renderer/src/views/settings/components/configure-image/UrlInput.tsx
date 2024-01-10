import { ActionIcon, TextInput } from '@mantine/core';
import { X } from 'react-feather';
import { createRef, forwardRef, useImperativeHandle } from 'react';

type UrlInputProps = {
  value: string;
  setValue: (newVal: string) => void;
  onChange: (newVal: string) => void;

  disabled?: boolean;
};
const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(function UrlInput(
  { value, setValue, onChange, disabled = false },
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
      onChange={(event) => onChange(event.target.value)}
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
            <X size={19.6} />
          </ActionIcon>
        )
      }
      disabled={disabled}
    />
  );
});

export default UrlInput;
