import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import IndexPageLayout from './layouts/IndexPageLayout';
import UserPageLayout from './layouts/UserPageLayout';
import { tokenLoader } from './utils/auth';
import Logout from './pages/Index/Auth/Logout';
import Loader from './components/Loader/Loader';
import ActivateUserPage from './pages/Index/Auth/ActivateUser';

const HomePage = lazy(() => import('./pages/Index/Home/Home'));
const AboutPage = lazy(() => import('./pages/Index/About/About'));
const ContactPage = lazy(() => import('./pages/Index/Contact/Contact'));
const RegisterPage = lazy(() => import('./pages/Index/Auth/Register'));
const ResetPasswordRequestPage = lazy(() => import('./pages/Index/Auth/ResetPasswordRequest'));
const ResetPasswordPage = lazy(() => import('./pages/Index/Auth/ResetPassword'));
const LoginPage = lazy(() => import('./pages/Index/Auth/Login'));
const UserLinks = lazy(() => import('./pages/Index/UserLinks/UserLinks'));
const IndexErrorPage = lazy(() => import('./error/IndexErrorPage'));

const Dashboard = lazy(() => import('./pages/User/Dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/User/Profile/Profile'));
const UserErrorPage = lazy(() => import('./error/UserErrorPage'));

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Suspense fallback={<Loader />}><IndexErrorPage /></Suspense>,
        id: 'pageRoot',
        loader: tokenLoader,
        children: [
            {
                path: '/', element: <IndexPageLayout />,
                children: [
                    { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
                ]
            },
            { path: ':username', element: <Suspense fallback={<Loader />}><UserLinks /></Suspense> },
            {
                path: 'p/',
                element: <IndexPageLayout />,
                errorElement: <Suspense fallback={<Loader />}><IndexErrorPage /></Suspense>,
                children: [
                    { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense>},
                    { path: 'about', element: <Suspense fallback={<Loader />}><AboutPage /></Suspense> },
                    { path: 'contact', element: <Suspense fallback={<Loader />}><ContactPage /></Suspense> },
                    { path: 'register', element: <Suspense fallback={<Loader />}><RegisterPage /></Suspense> },
                    { path: 'login', element: <Suspense fallback={<Loader />}><LoginPage /></Suspense> },
                    { path: 'logout', element: <Logout /> },
                    {
                        path: `${process.env.REACT_APP_RESET_PASSWORD_LINK_KEY}`,
                        children: [
                            { index: true, element: <Suspense fallback={<Loader />}><ResetPasswordRequestPage /></Suspense> },
                            { path: ':token', element: <Suspense fallback={<Loader />}><ResetPasswordPage /></Suspense> }
                        ],
                    },
                    { path: `${process.env.REACT_APP_USER_ACTIVATE_LINK_KEY}/:token`, element: <Suspense fallback={<Loader />}><ActivateUserPage /></Suspense> }
                ],
            },
            {
                path: 'u/',
                element: <UserPageLayout />,
                errorElement: <Suspense fallback={<Loader />}><UserErrorPage /></Suspense>,
                children: [
                    { index: true, element: <Suspense fallback={<Loader />}><Dashboard /></Suspense>},
                    { path: 'dashboard', element: <Suspense fallback={<Loader />}><Dashboard /></Suspense>},
                    { path: 'profile', element: <Suspense fallback={<Loader />}><Profile /></Suspense>},
                ],
            },
        ],
    },
]);

export default router;