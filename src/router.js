import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import IndexPageLayout from './layouts/IndexPageLayout';
import logoutAction from './pages/Index/Auth/LogOut';
import { checkUserLoginLoader, tokenLoader } from './utils/auth';

const HomePage = lazy(() => import('./pages/Index/Home/Home'));
const AboutPage = lazy(() => import('./pages/Index/About/About'));
const ContactPage = lazy(() => import('./pages/Index/Contact/Contact'));
const RegisterPage = lazy(() => import('./pages/Index/Auth/Register'));
const ResetPasswordRequestPage = lazy(() => import('./pages/Index/Auth/ResetPasswordRequest'));
const ResetPasswordPage = lazy(() => import('./pages/Index/Auth/ResetPassword'));
const LoginPage = lazy(() => import('./pages/Index/Auth/Login'));
const UserLinks = lazy(() => import('./pages/Index/UserLinks/UserLinks'));
const IndexErrorPage = lazy(() => import('./error/IndexErrorPage'));

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Suspense fallback={<p> Yüklənir... </p>}><IndexErrorPage /></Suspense>,
        id: 'pageRoot',
        loader: tokenLoader,
        children: [
            {
                path: '/', element: <IndexPageLayout />,
                children: [
                    { index: true, element: <Suspense fallback={<p> Yüklənir... </p>}><HomePage /></Suspense> },
                ]
            },
            { path: ':username', element: <Suspense fallback={<p> Yüklənir... </p>}><UserLinks /></Suspense> },
            {
                path: 'p/',
                element: <IndexPageLayout />,
                errorElement: <Suspense fallback={<p> Yüklənir... </p>}><IndexErrorPage /></Suspense>,
                children: [
                    { index: true, element: <Suspense fallback={<p> Yüklənir... </p>}><HomePage /></Suspense>},
                    { path: 'about', element: <Suspense fallback={<p> Yüklənir... </p>}><AboutPage /></Suspense> },
                    { path: 'contact', element: <Suspense fallback={<p> Yüklənir... </p>}><ContactPage /></Suspense> },
                    { path: 'register', element: <Suspense fallback={<p> Yüklənir... </p>}><RegisterPage /></Suspense>, loader: checkUserLoginLoader() },
                    { path: 'login', element: <Suspense fallback={<p> Yüklənir... </p>}><LoginPage /></Suspense>, loader: checkUserLoginLoader() },
                    { path: 'logout', action: logoutAction },
                    {
                        path: 'reset-password',
                        children: [
                            { index: true, element: <Suspense fallback={<p> Yüklənir... </p>}><ResetPasswordRequestPage /></Suspense> },
                            { path: ':token', element: <Suspense fallback={<p> Yüklənir... </p>}><ResetPasswordPage /></Suspense> }
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;