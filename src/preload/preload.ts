import { contextBridge, ipcRenderer } from 'electron';
import channels from '../shared/channels';

contextBridge.exposeInMainWorld('hotkeyOverlaysAPI', {
  [channels.getOverlays]: () => ipcRenderer.invoke(channels.getOverlays),
});
