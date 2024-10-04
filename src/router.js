import { createBrowserRouter } from 'react-router-dom';
import AboutPage from './pages/Index/About/About';
import IndexErrorPage from './error/IndexErrorPage';
import HomePage from './pages/Index/Home/Home';
import IndexPageLayout from './layouts/IndexPageLayout';
import ContactPage from './pages/Index/Contact/Contact';
import RegisterPage from './pages/Index/Auth/Register';
import LoginPage from './pages/Index/Auth/Login';
import UserLinks from './pages/Index/UserLinks/UserLinks';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <IndexErrorPage />,
        children: [
            { 
                path: '/', 
                element: <IndexPageLayout />, 
                children: [ 
                    { index: true, element: <HomePage /> }, 
                ] 
            },
            { path: ':username', element: <UserLinks /> },
        ]
    },
    {
        path: '/p/',
        element: <IndexPageLayout />,
        errorElement: <IndexErrorPage />,
        children: [
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'login', element: <LoginPage /> },
        ]
    },
])

export default router;