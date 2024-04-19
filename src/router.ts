import { createRouter, createWebHistory } from 'vue-router'

import EuroJackpot from './components/EuroJackpot.vue'
import Landing from './components/Landing.vue'

const routes = [
    { path: '/', component: Landing },
    { path: '/eurojackpot', component: EuroJackpot }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
