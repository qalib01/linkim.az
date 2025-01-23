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
const ActivateSubscriberPage = lazy(() => import('./pages/Index/Auth/ActivateSubscriber'));
const UnsubscriberPage = lazy(() => import('./pages/Index/Auth/Unsubscriber'));
const UserLinks = lazy(() => import('./pages/Index/UserLinks/UserLinks'));
const IndexErrorPage = lazy(() => import('./error/IndexErrorPage'));

const Dashboard = lazy(() => import('./pages/User/Dashboard/Dashboard'));
const EditableUser = lazy(() => import('./pages/User/Profile/EditableUser'));
const LoggedInUser = lazy(() => import('./pages/User/Profile/LoggedInUser'));
const Faqs = lazy(() => import('./pages/User/Faqs/Faqs'));
const Users = lazy(() => import('./pages/User/Users/Users'));
const UserErrorPage = lazy(() => import('./error/UserErrorPage'));

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: withSuspense(IndexErrorPage),
        id: 'pageRoot',
        children: [
            {
                element: withSuspense(IndexPageLayout),
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
                    { path: 'faqs', element: withSuspense(FaqPage) },
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
                    { path: `${process.env.REACT_APP_USER_ACTIVATE_LINK_KEY}/:token`, element: withSuspense(ActivateUserPage) },
                    { path: `${process.env.REACT_APP_SUBSCRIBER_ACTIVATE_LINK_KEY}/:token`, element: withSuspense(ActivateSubscriberPage) },
                    { path: `${process.env.REACT_APP_UNSUBSCRIBER_LINK_KEY}/:token`, element: withSuspense(UnsubscriberPage) }
                ],
            },
            {
                path: 'u/',
                element: <ProtectedRoute />,
                children: [
                    {
                        element: withSuspense(UserPageLayout),
                        errorElement: withSuspense(UserErrorPage),
                        children: [
                            { index: true, element: withSuspense(Dashboard) },
                            { path: 'dashboard', element: withSuspense(Dashboard) },
                            { path: 'profile', element: withSuspense(LoggedInUser) },
                            {
                              element: <ProtectedRoute allowedRoles='Admin' />,
                              children: [
                                {
                                    path: 'users',
                                    children: [
                                        { index: true, element: withSuspense(Users) },
                                        { path: 'profile/:id', element: withSuspense(EditableUser) },
                                    ]
                                },
                                { path: 'faqs', element: withSuspense(Faqs) },
                              ] 
                            },
                        ],
                    }
                ],
            },
        ],
    },
]);

export default router;