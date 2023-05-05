

import App from './App.vue'
import Form from './components/RegisterNota'
import PaginaPrueba from './components/PaginaPrueba'

import { createWebHistory, createRouter } from 'vue-router'



const routes = [
    
    {path: '/', 
    name: 'Noticias',
    component: App
    },
    {
    path: '/test1', 
    name: 'Test',
    component: PaginaPrueba
    },
    {
    path:'/formnotas',
    name: 'Registro', 
    component: Form}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

 export default router

 //process.env.BASE_URL