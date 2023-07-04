

import App from './App.vue'
import Form from './components/RegisterNota'
import InicioSesion from './components/PaginaLogin'
import BusquedaAvanzada from './components/BusquedaAvanza'

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
    path:'/registernotas',
    name: 'Registro', 
    component: Form
    },
    {
        path:'/busqavanzada',
        name: 'BusquedaAvanzada', 
        component: BusquedaAvanzada
        }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

 export default router

 