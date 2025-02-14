const ROUTES = {
    HOME: '/',
    API: {
        GLOBAL: '*',
        GLOBAL_ENDPOINT: '/api/index',
        USER_ENDPOINT: '/api/user',

        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        USER_ACTIVATE: '/auth/user-activate',
        RESEND_USER_ACTIVATE: '/auth/resend-user-activate',
        RESET_PASSWORD: '/auth/reset-password',

        SUBSCRIBE_ACTIVATE: '/subscribe-activate',
        RESEND_SUBSCRIBE_ACTIVATE: '/resend-subscribe-activate',
        UNSUBSCRIBE: '/unsubscribe',

        PHOTO_URL: '/images/users/',

        FAQS: '/faqs',
        TEAM: '/team',
        CONTACT: '/contact',
    },
    PUBLIC: {
        HOME: 'p/',
        ABOUT: 'about',
        CONTACT: 'contact',
        FAQS: 'faqs',
        REGISTER: 'register',
        LOGIN: 'login',
        LOGOUT: 'logout',

        USER_ACTIVATE: 'activate-user/:token',
        RESET_PASSWORD: 'reset-password',
        ACTIVATE_SUBSCRIPTION: 'activate-subscriber/:token',
        UNSUBSCRIBE: 'unsubscribe/:token',
        TOKEN_SLUG: ':token',
        USERNAME_SLUG: ':token',
    },
    PRIVATE: {
        HOME: 'u/',
        DASHBOARD: 'dashboard',
        PROFILE: 'profile',
        USERS: 'users',
        PROFILE_BY_ID: 'profile/:id',
        FAQS: 'faqs',
    }
}

export { ROUTES }