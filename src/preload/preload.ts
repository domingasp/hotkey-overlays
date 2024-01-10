import { contextBridge, ipcRenderer } from 'electron';
import channels from '../shared/channels';
import ImagePath from '../shared/types/ImagePath';

contextBridge.exposeInMainWorld('hotkeyOverlaysAPI', {
  [channels.getOverlays]: () => ipcRenderer.invoke(channels.getOverlays),
  [channels.updateOverlayName]: (id: number, name: string) =>
    ipcRenderer.invoke(channels.updateOverlayName, id, name),
  [channels.updateOverlayImage]: (
    id: number,
    imagePath: ImagePath | undefined
  ) => ipcRenderer.invoke(channels.updateOverlayImage, id, imagePath),
  [channels.updateOverlayHotkey]: (id: number, hotkey: string) =>
    ipcRenderer.invoke(channels.updateOverlayHotkey, id, hotkey),
  [channels.base64FromImagePath]: (imagePath: string) =>
    ipcRenderer.invoke(channels.base64FromImagePath, imagePath),
});
