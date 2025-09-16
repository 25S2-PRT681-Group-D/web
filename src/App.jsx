import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from './components';
import { AnalysisResult, Auth, Dashboard, MyRecords, NewInspection } from './pages';

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
      },
      {
        path: 'new-inspection',
        element: <NewInspection />
      },
      {
        path: 'analysis/:analysisId',
        element: <AnalysisResult />
      },
      {
        path: 'my-records',
        element: <MyRecords />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;