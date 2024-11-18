import { createRouter, createWebHistory } from 'vue-router'
import ItemPage from "@/views/ItemPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";


export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'main',
            component: ItemPage,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
        },
    ]
})