export default [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home.vue'),
    },
    {
        path: '/automated',
        name: 'automated',
        component: () => import('@/views/automated/index.vue'),
    },
]
