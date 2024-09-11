import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutPage from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import PageLayout from './pages/Root/PageLayout';

function App() {

  const router = createBrowserRouter([
    { 
      path: '/', 
      errorElement: <ErrorPage />,
      element: <PageLayout />, 
      children: [
        { path: '/about', element: <AboutPage />  }
      ]
    },
    // { path: '/about', element: <PageLayout /> }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;