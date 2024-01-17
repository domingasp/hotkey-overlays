import { Modal, Stack } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { Save } from 'react-feather';
import { useEffect, useState } from 'react';
import CancelConfirmButtons from '../../../../components/CancelConfirmButtons';

type ConfigureAutoTurnOffProps = {
  opened: boolean;
  close: () => void;
};
function ConfigureAutoTurnOff({ opened, close }: ConfigureAutoTurnOffProps) {
  const [autoTurnOff, setAutoTurnOff] = useState<string>('00:00:00');
  const [isValid, setIsValid] = useState(false);
  const valueRegex = /\d\d:\d\d:\d\d/;

  useEffect(() => {
    setIsValid(autoTurnOff.match(valueRegex) !== null);
  }, [autoTurnOff]);

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
              value={autoTurnOff}
              onChange={(event) => setAutoTurnOff(event.target.value)}
              styles={{
                input: {
                  textAlign: 'center',
                },
              }}
            />

            <CancelConfirmButtons
              onCancel={close}
              onConfirm={() => {}}
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
