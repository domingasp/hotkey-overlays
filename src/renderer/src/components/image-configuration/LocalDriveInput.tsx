import { FileInput, rem } from '@mantine/core';
import { IconPhotoSearch } from '@tabler/icons-react';
import { forwardRef } from 'react';

type LocalDriveInputProps = {
  value: File | null;
  onChange: ((payload: File | null) => void) | undefined;
  acceptedFileTypes: string;
  disabled?: boolean;
};
const LocalDriveInput = forwardRef<HTMLButtonElement, LocalDriveInputProps>(
  function LocalDriveInput(
    { value, onChange, acceptedFileTypes, disabled },
    ref
  ) {
    return (
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
    );
  }
);

export default LocalDriveInput;
