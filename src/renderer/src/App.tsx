import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mantine/core';
import Settings from './views/Settings';
import Overlay from './views/Overlay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Settings />,
  },
  {
    path: '/overlay',
    element: <Overlay />,
  },
]);

function App() {
  return (
    <Box w="100%" p="lg" miw="442px">
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
