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

        VALIDATE_LOGIN: '/auth/validate-login',
        VALIDATE_TOKEN: '/auth/validate-token',
        REFRESH_TOKEN: '/auth/refresh-token',
        RESET_PASSWORD_REQUEST: '/auth/reset-password-request',
        CHECK_USERNAME: '/check-userName',
        UPDATE_USER_LINKS_ORDER: '/update-userLinks-order',
        USER_DATA: '/user-data/',
        ADD_USER_DATA_BY_ID: '/add-user/',
        UPDATE_USER_DATA_BY_ID: '/update-user/',
        DELETE_USER_DATA_BY_ID: '/delete-user/',

        ADD_USER_LINK_BY_USER_ID: '/add-userLink/',
        UPDATE_USER_LINK_BY_ID: '/update-userLink/',
        DELETE_USER_LINK_BY_ID: '/delete-userLink/',
        ADD_USER: '/add-user',
        UPDATE_USER_BY_ID: '/update-user/',
        DELETE_USER_BY_ID: '/delete-user/',
        UPLOAD_USER_PHOTO_BY_ID: '/upload-userPhoto/',
        UPLOAD_USER_COVER_BY_ID: '/upload-userCover/',

        GET_USERS: '/get-users',
        GET_USER_BY_ID: '/get-user/',
        ACTIVATE_USER_BY_ID: '/activate-user/',

        SUBSCRIBE_ACTIVATE: '/subscribe-activate',
        ACTIVATE_SUBSCRIPTION_BY_ID: '/subscription-activate/',
        RESEND_SUBSCRIBE_ACTIVATE: '/resend-subscribe-activate',
        SUBSCRIBE: '/subscribe',
        UNSUBSCRIBE: '/unsubscribe',
        GET_SUBSCRIBE_OPTIONS: '/get-subscribeOptions',
        UPDATE_SUBSCRIBER_BY_ID: '/update-subscriber/',

        PHOTO_URL: '/images/users/',

        FAQS: '/faqs',
        TEAM: '/team',
        CONTACT: '/contact',

        GET_FAQS: '/get-faqs',
        ADD_FAQ: '/add-faq',
        ADD_FAQ_GROUP: '/add-faqGroup',
        UPDATE_FAQ_BY_ID: '/update-faq/',
        UPDATE_FAQ_GROUP_BY_ID: '/update-faqGroup/',
        DELETE_FAQ_BY_ID: '/delete-faq/',
        DELETE_FAQ_GROUP_BY_ID: '/delete-faqGroup/',
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
        USERNAME_SLUG: ':username',
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