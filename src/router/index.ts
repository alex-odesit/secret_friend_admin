import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Auth from '@/views/Auth.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'auth',
        component: Auth
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
