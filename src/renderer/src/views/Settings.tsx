import { Kbd } from '@mantine/core';
import Overlay from '../../../shared/types/Overlay';

type SettingsProps = {
  overlays: Overlay[];
};
function Settings({ overlays }: SettingsProps) {
  return (
    <div>
      settings <Kbd>{overlays.length}</Kbd>
    </div>
  );
}

export default Settings;
