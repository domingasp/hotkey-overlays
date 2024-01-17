const channels = {
  getOverlays: 'getOverlays',
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
  toggleOverlayWindow: 'toggleOverlayWindow',
};

export const channelsToRenderer = {
  sendNotification: 'sendNotification',
};

export default channels;
