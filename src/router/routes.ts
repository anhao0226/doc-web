export default [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */'@/views/base/Home.vue'),
    },
    {
        path: '/automated',
        name: 'automated',
        component: () => import(/* webpackChunkName: "automated" */'@/views/automated/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/**/ '@/views/user/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/**/ '@/views/user/register.vue')
    }
]
