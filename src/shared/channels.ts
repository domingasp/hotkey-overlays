const channels = {
  getOverlays: 'getOverlays',
  getOverlay: 'getOverlay',
  getOverlayImagePath: 'getOverlayImagePath',
  getOverlaySize: 'getOverlaySize',
  getOverlayPosition: 'getOverlayPosition',
  getOverlayAutoTurnOff: 'getOverlayAutoTurnOff',
  addOverlay: 'addOverlay',
  updateOverlayName: 'updateOverlayName',
  updateOverlayImage: 'updateOverlayImage',
  updateOverlayHotkey: 'updateOverlayHotkey',
  updateOverlayPositionSize: 'updateOverlayPositionSize',
  updateOverlayAutoTurnOff: 'updateOverlayAutoTurnOff',
  updateOverlayOrder: 'updateOverlayOrder',
  deleteOverlay: 'deleteOverlay',
  openConfigureOverlayPositionSize: 'openConfigureOverlayPositionSize',
  closeConfigureOverlayPositionSizeWindow:
    'closeConfigureOverlayPositionSizeWindow',
  base64FromImagePath: 'base64FromImagePath',
  registerOverlayHotkeys: 'registerOverlayHotkeys',
  unregisterOverlayHotkeys: 'unregisterOverlayHotkeys',
};

export const channelsToRenderer = {
  toggleOverlay: 'toggleOverlay',
  overlayUpdated: 'overlayUpdated',
  overlayDeleted: 'overlayDeleted',
  sendNotification: 'sendNotification',
};

export default channels;
