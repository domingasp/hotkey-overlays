import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Settings from './views/settings/Settings';
import Overlay from './views/overlay/Overlay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Settings />,
  },
  {
    path: '/overlay/:id',
    element: <Overlay />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
