import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import IndexPageLayout from './layouts/IndexPageLayout';
import UserPageLayout from './layouts/UserPageLayout';
import Loader from './components/Loader/Loader';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './utils/routes';


const withSuspense = (Component) => (<Suspense fallback={<Loader />}> <Component /> </Suspense>);
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
        path: ROUTES.HOME,
        errorElement: withSuspense(IndexErrorPage),
        id: 'pageRoot',
        children: [
            {
                element: withSuspense(IndexPageLayout),
                children: [
                    { index: true, element: withSuspense(HomePage) },
                ]
            },
            { path: ROUTES.PUBLIC.USERNAME_SLUG, element: withSuspense(UserLinks) },
            {
                path: ROUTES.PUBLIC.HOME,
                element: withSuspense(IndexPageLayout),
                errorElement: withSuspense(IndexErrorPage),
                children: [
                    { index: true, element: withSuspense(HomePage) },
                    { path: ROUTES.PUBLIC.ABOUT, element: withSuspense(AboutPage) },
                    { path: ROUTES.PUBLIC.CONTACT, element: withSuspense(ContactPage) },
                    { path: ROUTES.PUBLIC.LOGOUT, element: withSuspense(Logout) },
                    { path: ROUTES.PUBLIC.FAQS, element: withSuspense(FaqPage) },
                    {
                        path: ROUTES.PUBLIC.REGISTER,
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(RegisterPage) }
                        ]
                    },
                    {
                        path: ROUTES.PUBLIC.LOGIN,
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(LoginPage) }
                        ]
                    },
                    {
                        path: ROUTES.PUBLIC.RESET_PASSWORD,
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: withSuspense(ResetPasswordRequestPage) },
                            { path: ROUTES.PUBLIC.TOKEN_SLUG, element: withSuspense(ResetPasswordPage) }
                        ],
                    },
                    { path: ROUTES.PUBLIC.USER_ACTIVATE, element: withSuspense(ActivateUserPage) },
                    { path: ROUTES.PUBLIC.ACTIVATE_SUBSCRIPTION, element: withSuspense(ActivateSubscriberPage) },
                    { path: ROUTES.PUBLIC.UNSUBSCRIBE, element: withSuspense(UnsubscriberPage) }
                ],
            },
            {
                path: ROUTES.PRIVATE.HOME,
                element: <ProtectedRoute />,
                children: [
                    {
                        element: withSuspense(UserPageLayout),
                        errorElement: withSuspense(UserErrorPage),
                        children: [
                            { index: true, element: withSuspense(Dashboard) },
                            { path: ROUTES.PRIVATE.DASHBOARD, element: withSuspense(Dashboard) },
                            { path: ROUTES.PRIVATE.PROFILE, element: withSuspense(LoggedInUser) },
                            {
                                element: <ProtectedRoute allowedRoles={ 'Admin' } />,
                                children: [
                                    {
                                        path: ROUTES.PRIVATE.USERS,
                                        children: [
                                            { index: true, element: withSuspense(Users) },
                                            { path: ROUTES.PRIVATE.PROFILE_BY_ID, element: withSuspense(EditableUser) },
                                        ]
                                    },
                                    { path: ROUTES.PRIVATE.FAQS, element: withSuspense(Faqs) },
                                ],
                            },
                        ],
                    }
                ],
            },
        ],
    },
]);

export default router;