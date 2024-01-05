"use strict";
const electron = require("electron");
let settingsWindow;
let overlayWindow;
function createSettingsWindow() {
  settingsWindow = new electron.BrowserWindow({
    autoHideMenuBar: true
  });
  settingsWindow.loadURL("http://localhost:5173");
  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}
function toggleOverlayWindow() {
  if (overlayWindow == null) {
    overlayWindow = new electron.BrowserWindow({
      autoHideMenuBar: true,
      transparent: true,
      frame: false,
      fullscreen: true
    });
    overlayWindow.setAlwaysOnTop(true, "screen");
    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.loadURL("http://localhost:5173");
  } else {
    overlayWindow.close();
    overlayWindow = null;
  }
}
electron.app.whenReady().then(() => {
  createSettingsWindow();
  electron.globalShortcut.register("CommandOrControl+Shift+]", toggleOverlayWindow);
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (settingsWindow == null) {
    createSettingsWindow();
  }
});
