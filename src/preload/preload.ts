import { contextBridge, ipcRenderer } from 'electron';
import channels from '../shared/channels';

contextBridge.exposeInMainWorld('hotkeyOverlaysAPI', {
  [channels.getOverlayHotkey]: () =>
    ipcRenderer.invoke(channels.getOverlayHotkey),
});
