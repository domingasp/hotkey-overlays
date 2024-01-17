import { Modal, Stack } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { Save } from 'react-feather';
import { useEffect, useState } from 'react';
import CancelConfirmButtons from '../../../../components/CancelConfirmButtons';

type ConfigureAutoTurnOffProps = {
  opened: boolean;
  close: () => void;
  value: string | undefined;
  onSave: (value: string) => void;
};
function ConfigureAutoTurnOff({
  opened,
  close,
  value,
  onSave,
}: ConfigureAutoTurnOffProps) {
  const [autoTurnOffValue, setAutoTurnOffValue] = useState<string>('00:00:00');
  const [isValid, setIsValid] = useState(false);
  const valueRegex = /\d\d:\d\d:\d\d/;

  useEffect(() => {
    if (opened) {
      setAutoTurnOffValue(value ?? '00:00:00');
    }
  }, [opened]);

  useEffect(() => {
    setIsValid(autoTurnOffValue.match(valueRegex) !== null);
  }, [autoTurnOffValue]);

  return (
    <Modal.Root opened={opened} onClose={close} centered>
      <Modal.Overlay backgroundOpacity={0.55} blur={2} />
      <Modal.Content maw={398}>
        <Modal.Header>
          <Modal.Title fw="bold">Configure Auto Turn Off</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <TimeInput
              label="Automatically Turn Off After (H:M:s)"
              withSeconds
              value={autoTurnOffValue}
              onChange={(event) => setAutoTurnOffValue(event.target.value)}
              styles={{
                input: {
                  textAlign: 'center',
                },
              }}
            />

            <CancelConfirmButtons
              onCancel={close}
              onConfirm={() => {
                onSave(autoTurnOffValue);
              }}
              confirmIcon={<Save size={16} />}
              confirmDisabled={!isValid}
            />
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ConfigureAutoTurnOff;
