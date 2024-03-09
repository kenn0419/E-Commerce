const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOG: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'final-register/:status',
    RESET_PASSWORD: 'reset-password/:token',

    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDERS: 'manage-orders',
    CREATE_PRODUCTS: 'create-products',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MYCART: 'my-cart',
    WISHLIST: 'wishlist',
    HISTORY: 'buy-history',
}

export default path;