

import App from './App.vue'
import Form from './components/RegisterNota'
import PaginaPrueba from './components/PaginaPrueba'
import { createWebHistory, createRouter } from 'vue-router'



const routes = [
    {path: '/', 
    name: 'home',
    component: App
    },
    {
    path: '/pagina', 
    name: 'home',
    component: PaginaPrueba
    },
    {
    path:'/formnotas',
    name: 'home', 
    component: Form}

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

 export default router