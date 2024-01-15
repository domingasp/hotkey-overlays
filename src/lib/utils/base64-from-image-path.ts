import fs from 'fs';

async function base64FromImagePath(imagePath: string) {
  try {
    const file = fs.readFileSync(imagePath);
    const base64Img = file.toString('base64');
    return base64Img;
  } catch {
    return undefined;
  }
}

export default base64FromImagePath;
