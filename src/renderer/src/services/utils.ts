const fileToBase64 = async (path: string, type: string) => {
  const encodedImage: string =
    await // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).hotkeyOverlaysAPI.base64FromImagePath(path);

  return `data:${type};base64, ${encodedImage}`;
};

export default fileToBase64;
