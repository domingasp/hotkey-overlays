const channels = {
  getOverlays: 'getOverlays',
  getOverlayImagePath: 'getOverlayImagePath',
  getOverlaySize: 'getOverlaySize',
  getOverlayPosition: 'getOverlayPosition',
  addOverlay: 'addOverlay',
  updateOverlayName: 'updateOverlayName',
  updateOverlayImage: 'updateOverlayImage',
  updateOverlayHotkey: 'updateOverlayHotkey',
  updateOverlayPositionSize: 'updateOverlayPositionSize',
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
  sendNotification: 'sendNotification',
};

export default channels;
