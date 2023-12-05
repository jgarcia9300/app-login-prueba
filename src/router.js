import PaginaPrincipal from './components/PaginaPrincipal.vue' 
import Form from './components/RegisterNota'
import InicioSesion from './components/PaginaLogin'
import BusquedaAvanzada from './components/BusquedaAvanza'
import LoginSecundario from './components/LoginSecundario'

import { createWebHistory, createRouter } from 'vue-router'
import { auth } from './firebase'



const routes = [
  {
    // Define la URL que activará esta ruta.
    path: '/',
    // Define el nombre de la ruta.
    name: 'home',
    // Define el componente que se renderizará cuando se active la ruta.
    component: LoginSecundario,
    //meta es un objeto que contiene datos adicionales asociados con la ruta.
    // Define si la ruta requiere autenticación.

  },    
  {
    path: '/vista',
    name: 'vista',
    // route level code-splitting
    // la siguiente linea se utiliza para cargar el componente sobre demanda cuando se navega a esta ruta. Ademas requireAuth: true define si la ruta requiere autenticación.
    component: () => import('./components/Vista.vue'),
    meta: {
      requiresAuth: true
    } 
  
  },
    {
        path: '/', 
        name: 'Noticias',
        component: PaginaPrincipal,
        meta: {
            // requiresAuth: true
          }
    },
    {
        path: '/login', 
        name: 'InicioSesion',
        component: InicioSesion,
        meta: {
            // requiresAuth: true
          }
    },
    {
        path:'/registernotas',
        name: 'Registro', 
        component: Form,
        meta: {
            // requiresAuth: true
          }
    },
    {
        path:'/busqavanzada',
        name: 'BusquedaAvanzada', 
        component: BusquedaAvanzada,
        meta: {
            // requiresAuth: true
          }
     }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// beforeEach se utiliza para ejecutar una función antes de cada navegación. to, from y next son los parámetros de la función. to es un objeto que representa la ruta a la que se navega, from es un objeto que representa la ruta desde la que se navega y next es una función que se utiliza para continuar con la navegación.
router.beforeEach((to, from, next) => {
    //la siguiente condicion se utiliza para verificar si la ruta requiere autenticación y si el usuario no está autenticado, redirige al usuario a la ruta de inicio de sesión.
    if (to.path === '/login' && auth.currentUser) {
      next('/')
      return;
    }
    //  Esta condición if combina dos comprobaciones. La primera parte, to.matched.some(record => record.meta.requiresAuth), verifica si la ruta a la que el usuario intenta acceder (representada por to) tiene una metaetiqueta llamada "requiresAuth". En Vue Router, las metaetiquetas son propiedades personalizadas que se pueden adjuntar a las rutas para proporcionar información adicional sobre la ruta. La segunda parte de la condición, !auth.currentUser, verifica si no existe un usuario autenticado. Esta comprobación se realiza probablemente utilizando un sistema de autenticación como Firebase Authentication (Firebase).
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
      next('/login')
      return;
    }
  
    next();
  })

 export default router

 