import ImagePath from './ImagePath';

type Overlay = {
  id: number;
  name: string;
  hotkey: string;
  imagePath?: ImagePath;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

export default Overlay;
