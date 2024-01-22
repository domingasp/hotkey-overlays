import { RouterProvider, createHashRouter } from 'react-router-dom';
import Settings from './views/settings/Settings';
import Overlay from './views/overlay/Overlay';
import ConfigureOverlayPositionSize from './views/configure-overlay-position-size/ConfigureOverlayPositionSize';

const router = createHashRouter([
  {
    path: '/',
    element: <Settings />,
  },
  {
    path: '/overlay-display',
    element: <Overlay />,
  },
  {
    path: '/overlay/:id/position-size',
    element: <ConfigureOverlayPositionSize />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
