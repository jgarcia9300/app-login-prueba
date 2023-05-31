

import App from './App.vue'
import Form from './components/RegisterNota'
import InicioSesion from './components/PaginaLogin'

import { createWebHistory, createRouter } from 'vue-router'



const routes = [
    
    {path: '/', 
    name: 'Noticias',
    component: App
    },
    {
    path: '/login', 
    name: 'InicioSesion',
    component: InicioSesion
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