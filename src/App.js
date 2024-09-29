import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutPage from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import PageLayout from './pages/Root/PageLayout';
import ContactPage from './pages/Contact/Contact';
import RegisterPage from './pages/Register/Register';
import LoginPage from './pages/Login/Login';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <PageLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />  },
      { path: '/about', element: <AboutPage />  },
      { path: '/contact', element: <ContactPage />  },
      { path: '/register', element: <RegisterPage />  },
      { path: '/login', element: <LoginPage />  },
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;