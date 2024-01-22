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
  deleteOverlay: 'deleteOverlay',
  openConfigureOverlayPositionSize: 'openConfigureOverlayPositionSize',
  closeConfigureOverlayPositionSizeWindow:
    'closeConfigureOverlayPositionSizeWindow',
  base64FromImagePath: 'base64FromImagePath',
  registerOverlayHotkeys: 'registerOverlayHotkeys',
  unregisterOverlayHotkeys: 'unregisterOverlayHotkeys',
  reopenAllOpenedOverlays: 'reopenAllOpenedOverlays',
};

export const channelsToRenderer = {
  toggleOverlay: 'toggleOverlay',
  overlayDeleted: 'overlayDeleted',
  sendNotification: 'sendNotification',
};

export default channels;
