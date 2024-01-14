/* eslint-disable @typescript-eslint/no-explicit-any */

import ImagePath from '../../../models/ImagePath';

// Basic Overlay Configuration
export async function getOverlays() {
  const res = await (window as any).hotkeyOverlaysAPI.getOverlays();
  return res;
}

export async function getOverlayImagePath(
  idToFetch: number
): Promise<ImagePath | undefined> {
  const res = await (window as any).hotkeyOverlaysAPI.getOverlayImagePath(
    idToFetch
  );

  return res;
}

export async function addOverlay() {
  await (window as any).hotkeyOverlaysAPI.addOverlay();
}

export async function updateOverlayName(id: number, name: string) {
  await (window as any).hotkeyOverlaysAPI.updateOverlayName(id, name);
}

export async function updateOverlayImage(
  id: number,
  imagePath: ImagePath | undefined
) {
  await (window as any).hotkeyOverlaysAPI.updateOverlayImage(id, imagePath);
}

export async function updateOverlayHotkey(id: number, hotkey: string) {
  await (window as any).hotkeyOverlaysAPI.updateOverlayHotkey(id, hotkey);
}

export async function deleteOverlay(id: number) {
  await (window as any).hotkeyOverlaysAPI.deleteOverlay(id);
}

// Overlay position + size configuration
export async function openConfigureOverlayPositionSize(id: number) {
  await (window as any).hotkeyOverlaysAPI.openConfigureOverlayPositionSize(id);
}

export async function closeConfigureOverlayPositionSizeWindow() {
  await (
    window as any
  ).hotkeyOverlaysAPI.closeConfigureOverlayPositionSizeWindow();
}

// Utils
export async function fileToBase64(
  path: string,
  type: string
): Promise<string> {
  const encodedImage: string = await (
    window as any
  ).hotkeyOverlaysAPI.base64FromImagePath(path);

  return `data:${type};base64, ${encodedImage}`;
}

export async function registerOverlayHotkeys() {
  await (window as any).hotkeyOverlaysAPI.registerOverlayHotkeys();
}

export async function unregisterOverlayHotkeys() {
  await (window as any).hotkeyOverlaysAPI.unregisterOverlayHotkeys();
}
