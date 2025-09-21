import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './store'

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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;