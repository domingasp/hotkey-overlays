import { BrowserWindow } from 'electron';
import unregisterOverlayHotkeys from '../global-hotkeys/unregister-hotkeys';
import GenerateOverlayWindow from '../utils/overlay-window';

async function openConfigureOverlayPositionSize(
  id: number,
  baseUrl: string,
  settingsWindow: BrowserWindow | null,
  configurePositionSizeWindow: BrowserWindow | null
) {
  await unregisterOverlayHotkeys(settingsWindow);

  if (configurePositionSizeWindow !== null) {
    configurePositionSizeWindow.close();
  }

  // eslint-disable-next-line no-param-reassign
  const window = GenerateOverlayWindow();
  window.loadURL(`${baseUrl}#/overlay/${id}/position-size`);

  return window;
}

export default openConfigureOverlayPositionSize;
