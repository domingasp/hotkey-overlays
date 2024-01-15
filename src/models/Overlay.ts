import ImagePath from './ImagePath';
import Position from './Position';
import Size from './Size';

type Overlay = {
  id: number;
  name: string;
  hotkey: string;
  imagePath?: ImagePath;
  position: Position;
  sizes: {
    default: Size;
    current: Size;
  };
};

export default Overlay;
