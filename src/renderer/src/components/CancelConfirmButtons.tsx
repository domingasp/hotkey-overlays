import { Group, Button } from '@mantine/core';

type CancelConfirmButtonsProps = {
  onCancel: () => void;
  onConfirm: () => void;
  confirmIcon?: React.ReactNode;
  confirmDisabled?: boolean;
};
function CancelConfirmButtons({
  onCancel,
  onConfirm,
  confirmIcon,
  confirmDisabled,
}: CancelConfirmButtonsProps) {
  return (
    <Group justify="space-between">
      <Button variant="default" onClick={onCancel} size="sm">
        Cancel
      </Button>

      <Button
        variant="light"
        color="green"
        leftSection={confirmIcon}
        onClick={onConfirm}
        disabled={confirmDisabled}
      >
        Save
      </Button>
    </Group>
  );
}

export default CancelConfirmButtons;
