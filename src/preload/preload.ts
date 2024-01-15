import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import channels from '../shared/channels';
import ImagePath from '../models/ImagePath';
import Position from '../models/Position';
import Size from '../models/Size';

contextBridge.exposeInMainWorld('hotkeyOverlaysAPI', {
  ipcRenderer: {
    on(channel: string, func: (...arg: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
  },
  [channels.getOverlays]: () => ipcRenderer.invoke(channels.getOverlays),
  [channels.getOverlayImagePath]: (id: number) =>
    ipcRenderer.invoke(channels.getOverlayImagePath, id),
  [channels.getOverlaySize]: (id: number) =>
    ipcRenderer.invoke(channels.getOverlaySize, id),
  [channels.getOverlayPosition]: (id: number) =>
    ipcRenderer.invoke(channels.getOverlayPosition, id),
  [channels.addOverlay]: () => ipcRenderer.invoke(channels.addOverlay),
  [channels.updateOverlayName]: (id: number, name: string) =>
    ipcRenderer.invoke(channels.updateOverlayName, id, name),
  [channels.updateOverlayImage]: (
    id: number,
    imagePath: ImagePath | undefined,
    position: Position,
    size: Size
  ) =>
    ipcRenderer.invoke(
      channels.updateOverlayImage,
      id,
      imagePath,
      position,
      size
    ),
  [channels.updateOverlayHotkey]: (id: number, hotkey: string) =>
    ipcRenderer.invoke(channels.updateOverlayHotkey, id, hotkey),
  [channels.updateOverlayPositionSize]: (
    id: number,
    position: Position,
    size: Size
  ) =>
    ipcRenderer.invoke(channels.updateOverlayPositionSize, id, position, size),
  [channels.deleteOverlay]: (id: number) =>
    ipcRenderer.invoke(channels.deleteOverlay, id),
  [channels.openConfigureOverlayPositionSize]: (id: number) =>
    ipcRenderer.invoke(channels.openConfigureOverlayPositionSize, id),
  [channels.closeConfigureOverlayPositionSizeWindow]: () =>
    ipcRenderer.invoke(channels.closeConfigureOverlayPositionSizeWindow),
  [channels.base64FromImagePath]: (imagePath: string) =>
    ipcRenderer.invoke(channels.base64FromImagePath, imagePath),
  [channels.registerOverlayHotkeys]: () =>
    ipcRenderer.invoke(channels.registerOverlayHotkeys),
  [channels.unregisterOverlayHotkeys]: () =>
    ipcRenderer.invoke(channels.unregisterOverlayHotkeys),
  [channels.reopenAllOpenedOverlays]: () =>
    ipcRenderer.invoke(channels.reopenAllOpenedOverlays),
});
