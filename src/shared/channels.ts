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
};

export const channelsToRenderer = {
  toggleOverlay: 'toggleOverlay',
  sendNotification: 'sendNotification',
};

export default channels;
