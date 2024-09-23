import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/index.vue')
        },
        {
            path: '/input',
            name: 'Input',
            component: () => import('@/views/input/index.vue')
        },
        {
            path: '/button',
            name: 'Button',
            component: () => import('@/views/button/index.vue')
        }
    ]
})

export default router
