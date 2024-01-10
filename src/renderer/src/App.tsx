import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Settings from './views/Settings';
import Overlay from './views/Overlay';

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
