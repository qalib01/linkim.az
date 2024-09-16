import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutPage from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import PageLayout from './pages/Root/PageLayout';
import ContactPage from './pages/Contact/Contact';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <PageLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />  },
      { path: '/about', element: <AboutPage />  },
      { path: '/contact', element: <ContactPage />  },
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;