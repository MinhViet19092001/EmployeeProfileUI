
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/views/Login/Login.vue';
import Overview from '@/components/views/Overview/Overview.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login
    },
    {
        path: '/overview',
        name: 'overview',
        component: Overview
    }
]

const router = createRouter({
    history: createWebHistory(),
    hash: false,
    routes
})

export default router;



