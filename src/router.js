import { createBrowserRouter } from 'react-router-dom';
import AboutPage from './pages/Index/About/About';
// import IndexErrorPage from './pages/Index/Error/Error';
import IndexErrorPage from './error/IndexErrorPage';
import HomePage from './pages/Index/Home/Home';
import IndexPageLayout from './layouts/IndexPageLayout';
import ContactPage from './pages/Index/Contact/Contact';
import RegisterPage from './pages/Index/Register/Register';
import LoginPage from './pages/Index/Login/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexPageLayout />,
        errorElement: <IndexErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '/register', element: <RegisterPage /> },
            { path: '/login', element: <LoginPage /> },
        ]
    },
])

export default router;