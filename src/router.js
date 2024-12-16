import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import IndexPageLayout from './layouts/IndexPageLayout';
import UserPageLayout from './layouts/UserPageLayout';
import Loader from './components/Loader/Loader';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const withSuspense = (Component) => ( <Suspense fallback={<Loader />}> <Component /> </Suspense> );
const HomePage = lazy(() => import('./pages/Index/Home/Home'));
const AboutPage = lazy(() => import('./pages/Index/About/About'));
const ContactPage = lazy(() => import('./pages/Index/Contact/Contact'));
const RegisterPage = lazy(() => import('./pages/Index/Auth/Register'));
const ResetPasswordRequestPage = lazy(() => import('./pages/Index/Auth/ResetPasswordRequest'));
const ResetPasswordPage = lazy(() => import('./pages/Index/Auth/ResetPassword'));
const LoginPage = lazy(() => import('./pages/Index/Auth/Login'));
const FaqPage = lazy(() => import('./pages/Index/Faqs/Faqs'));
const Logout = lazy(() => import('./pages/Index/Auth/Logout'));
const ActivateUserPage = lazy(() => import('./pages/Index/Auth/ActivateUser'));
const UserLinks = lazy(() => import('./pages/Index/UserLinks/UserLinks'));
const IndexErrorPage = lazy(() => import('./error/IndexErrorPage'));

const Dashboard = lazy(() => import('./pages/User/Dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/User/Profile/Profile'));
const UserErrorPage = lazy(() => import('./error/UserErrorPage'));

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: withSuspense(IndexErrorPage),
        id: 'pageRoot',
        children: [
            {
                path: '/', element: withSuspense(IndexPageLayout),
                children: [
                    { index: true, element: withSuspense(HomePage) },
                ]
            },
            { path: ':username', element: withSuspense(UserLinks) },
            {
                path: 'p/',
                element: withSuspense(IndexPageLayout),
                errorElement: withSuspense(IndexErrorPage),
                children: [
                    { index: true, element: withSuspense(HomePage) },
                    { path: 'about', element: withSuspense(AboutPage) },
                    { path: 'contact', element: withSuspense(ContactPage) },
                    { path: 'logout', element: withSuspense(Logout) },
                    { path: 'tvs', element: withSuspense(FaqPage) },
                    { 
                        path: 'register', 
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(RegisterPage) }
                        ]
                    },
                    { 
                        path: 'login', 
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(LoginPage) }
                        ]
                    },
                    {
                        path: `${process.env.REACT_APP_RESET_PASSWORD_LINK_KEY}`,
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(ResetPasswordRequestPage) },
                            { path: ':token', element: withSuspense(ResetPasswordPage) }
                        ],
                    },
                    { path: `${process.env.REACT_APP_USER_ACTIVATE_LINK_KEY}/:token`, element: withSuspense(ActivateUserPage) }
                ],
            },
            {
                path: 'u/',
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '',
                        element: withSuspense(UserPageLayout),
                        errorElement: withSuspense(UserErrorPage),
                        children: [
                            { index: true, element: withSuspense(Dashboard) },
                            { path: 'dashboard', element: withSuspense(Dashboard) },
                            { path: 'profile', element: withSuspense(Profile) },
                        ],
                    }
                ]
            },
        ],
    },
]);

export default router;