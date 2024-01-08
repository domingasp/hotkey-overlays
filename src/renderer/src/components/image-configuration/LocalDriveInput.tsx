import { Box, FileInput, Text, rem } from '@mantine/core';
import { IconPhotoSearch } from '@tabler/icons-react';
import { forwardRef } from 'react';

type LocalDriveInputProps = {
  initialValueLabel: string;
  value: File | null;
  onChange: (payload: File | null) => void;
  acceptedFileTypes: string;
  disabled?: boolean;
};
const LocalDriveInput = forwardRef<HTMLButtonElement, LocalDriveInputProps>(
  function LocalDriveInput(
    { initialValueLabel, value, onChange, acceptedFileTypes, disabled },
    ref
  ) {
    return (
      <Box pos="relative">
        {initialValueLabel !== '' && (
          <Text
            pos="absolute"
            bottom={7}
            left={35}
            size="sm"
            maw={89}
            truncate
            bg="dark.6"
            style={{ pointerEvents: 'none', zIndex: 1 }}
          >
            {initialValueLabel}
          </Text>
        )}

        <FileInput
          ref={ref}
          label="From Local Drive:"
          clearable
          value={value}
          onChange={onChange}
          fileInputProps={{
            onClick: (event) => {
              event.currentTarget.value = '';
            },
          }}
          placeholder="Find image"
          leftSection={
            <IconPhotoSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          leftSectionPointerEvents="none"
          accept={acceptedFileTypes}
          disabled={disabled}
        />
      </Box>
    );
  }
);

export default LocalDriveInput;
