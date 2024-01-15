import { ActionIcon, Box, Text, TextInput } from '@mantine/core';
import { Check } from 'react-feather';
import { createRef, useEffect, useRef, useState } from 'react';

type NameInputProps = {
  value: string;
  setValue: (value: string) => void;
  isSaving: boolean;
  onSave: () => void;
};
function NameInput({ value, setValue, isSaving, onSave }: NameInputProps) {
  const [originalValue, setOriginalValue] = useState(value);
  const [isNameFieldFocused, setIsNameFieldFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [width, setWidth] = useState(0);
  const span = createRef<HTMLParagraphElement>();
  const inputFieldRef = createRef<HTMLInputElement>();
  const inputFieldBlurTimer = useRef<NodeJS.Timeout>();

  const validateField = (val: string) => {
    if (val.trim() === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setValue(newValue);
    validateField(newValue);
  };

  useEffect(() => {
    return () => clearTimeout(inputFieldBlurTimer.current);
  }, []);

  useEffect(() => {
    if (span.current) {
      const minWidth = 116;
      const maxWidth = 190;
      let calculatedWidth = span.current.offsetWidth + 40;
      if (calculatedWidth < minWidth) calculatedWidth = minWidth;
      else if (calculatedWidth > maxWidth) calculatedWidth = maxWidth;

      setWidth(calculatedWidth);
    }
  }, [value]);

  useEffect(() => {
    if (!isNameFieldFocused && !isSaving) {
      setValue(originalValue);
    }
  }, [isNameFieldFocused]);

  useEffect(() => {
    setOriginalValue(value);
  }, [isSaving]);

  return (
    <Box pos="relative" style={{ overflow: 'hidden' }}>
      <Text
        ref={span}
        size="md"
        fw="bold"
        px="xs"
        style={{
          visibility: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
        }}
        span
      >
        {value}
      </Text>

      <TextInput
        ref={inputFieldRef}
        /* FUNCTIONS */
        value={value}
        onChange={onChange}
        onFocus={() => {
          clearTimeout(inputFieldBlurTimer.current);
          setIsNameFieldFocused(true);
        }}
        onBlur={() => {
          inputFieldBlurTimer.current = setTimeout(
            () => setIsNameFieldFocused(false),
            100
          );
        }}
        onKeyUp={(event) => {
          if (!isSaving && isValid && event.key === 'Enter') {
            onSave();
            inputFieldRef.current?.blur();
          } else if (!isSaving && event.key === 'Escape') {
            inputFieldRef.current?.blur();
          }
        }}
        disabled={isSaving}
        /* RIGHT SECTION */
        rightSection={
          (isNameFieldFocused || isSaving) && (
            <ActionIcon
              variant="light"
              color="green"
              aria-label="Save Name"
              onClick={onSave}
              loading={isSaving}
              disabled={!isValid}
            >
              <Check size={14} />
            </ActionIcon>
          )
        }
        rightSectionPointerEvents={isValid ? 'all' : 'none'}
        rightSectionWidth="36px"
        rightSectionProps={{ style: { justifyContent: 'flex-end' } }}
        /* STYLE */
        variant="unstyled"
        bg={isNameFieldFocused || isSaving ? 'dark' : undefined}
        px={isNameFieldFocused || isSaving ? 'xs' : undefined}
        w={width}
        fw="bold"
        size="md"
        style={{
          borderRadius: 'var(--mantine-radius-md)',
          transition: 'background-color 0.15s, padding 0.15s',
        }}
      />
    </Box>
  );
}

export default NameInput;
