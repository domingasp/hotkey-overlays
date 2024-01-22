import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import registerOverlayHotkeys from '../global-hotkeys/register-hotkeys';
import SchemaInterface from '../../models/SchemaInterface';

async function closeConfigureOverlayPositionSizeWindow(
  configurePositionSizeWindow: BrowserWindow | null,
  store: Store<SchemaInterface>,
  baseUrl: string,
  overlayWindow: BrowserWindow | null,
  settingsWindow: BrowserWindow | null
) {
  if (configurePositionSizeWindow !== null) {
    configurePositionSizeWindow.close();
  }

  await registerOverlayHotkeys(store, baseUrl, overlayWindow, settingsWindow);

  return null;
}

export default closeConfigureOverlayPositionSizeWindow;
