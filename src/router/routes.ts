export default [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */'@/views/Home.vue'),
    },
    {
        path: '/automated',
        name: 'automated',
        component: () => import(/* webpackChunkName: "automated" */'@/views/automated/index.vue'),
    },
]
