import { contextBridge, ipcRenderer } from 'electron';
import channels from '../shared/channels';

contextBridge.exposeInMainWorld('hotkeyOverlaysAPI', {
  [channels.getOverlays]: () => ipcRenderer.invoke(channels.getOverlays),
  [channels.updateOverlayName]: (id: number, name: string) =>
    ipcRenderer.invoke(channels.updateOverlayName, id, name),
  [channels.updateOverlayImage]: (id: number, imagePath: string | undefined) =>
    ipcRenderer.invoke(channels.updateOverlayImage, id, imagePath),
  [channels.base64FromImagePath]: (imagePath: string) =>
    ipcRenderer.invoke(channels.base64FromImagePath, imagePath),
});
