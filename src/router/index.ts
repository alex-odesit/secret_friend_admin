import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
