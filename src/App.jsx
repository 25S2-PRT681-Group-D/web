import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from './components';
import { Auth, Dashboard } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'auth',
        element: <Auth />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;