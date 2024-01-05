"use strict";
const electron = require("electron");
const channels = {
  getOverlayHotkey: "getOverlayHotkey"
};
electron.contextBridge.exposeInMainWorld("hotkeyOverlaysAPI", {
  [channels.getOverlayHotkey]: () => electron.ipcRenderer.invoke(channels.getOverlayHotkey)
});
