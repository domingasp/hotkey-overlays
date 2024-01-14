import ImagePath from './ImagePath';

type Overlay = {
  id: number;
  name: string;
  hotkey: string;
  imagePath?: ImagePath;
};

export default Overlay;
