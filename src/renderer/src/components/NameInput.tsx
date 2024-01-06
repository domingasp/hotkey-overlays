import { ActionIcon, Box, Text, TextInput, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { createRef, useEffect, useRef, useState } from 'react';

type NameInputProps = {
  value: string;
  setValue: (value: string) => void;
};
function NameInput({ value, setValue }: NameInputProps) {
  const [isNameFieldFocused, setIsNameFieldFocused] = useState(false);
  const [isSavingNameField, setIsSavingNameField] = useState(false);

  const [width, setWidth] = useState(0);
  const span = createRef<HTMLParagraphElement>();
  const inputFieldBlurTimer = useRef<NodeJS.Timeout>();

  const saveNameField = () => {
    setIsSavingNameField(true);
    console.log('Name saved');
    setTimeout(() => {
      setIsSavingNameField(false);
    }, 2000);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  };

  useEffect(() => {
    return () => clearTimeout(inputFieldBlurTimer.current);
  }, []);

  useEffect(() => {
    if (span.current) {
      let calculatedWidth = span.current.offsetWidth + 40;
      if (calculatedWidth < 100) calculatedWidth = 100;
      else if (calculatedWidth > 253) calculatedWidth = 253;

      setWidth(calculatedWidth);
    }
  }, [value]);

  return (
    <Box pos="relative" style={{ overflow: 'hidden' }}>
      <Text
        ref={span}
        size="md"
        fw="bold"
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
        variant="unstyled"
        value={value}
        onChange={onChange}
        w={width}
        fw="bold"
        size="md"
        pl={0}
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
        disabled={isSavingNameField}
        rightSection={
          (isNameFieldFocused || isSavingNameField) && (
            <ActionIcon
              variant="light"
              color="green"
              aria-label="Save Name"
              onClick={saveNameField}
              loading={isSavingNameField}
            >
              <IconCheck
                pointerEvents="none"
                style={{ width: rem(14), height: rem(14) }}
              />
            </ActionIcon>
          )
        }
        rightSectionPointerEvents="all"
        rightSectionWidth="36px"
        rightSectionProps={{ style: { justifyContent: 'flex-end' } }}
      />
    </Box>
  );
}

export default NameInput;
