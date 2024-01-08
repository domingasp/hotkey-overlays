const fileToBase64 = async (path: string, type: string) => {
  const encodedImage: string = await (
    window as any
  ).hotkeyOverlaysAPI.base64FromImagePath(path);

  return `data:${type};base64, ${encodedImage}`;
};

export default fileToBase64;
