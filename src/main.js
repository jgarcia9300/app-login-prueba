import { createApp} from 'vue'
//import App from './App.vue'
import PaginaInicio from './components/PaginaInicio'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

// const SimpleRouterApp = {
//   data: () => ({
//     currentRoute: window.location.pathname
//   }),

//   computed: {
//     ViewComponent () {
//       const matchingPage = routes[this.currentRoute] || '404'
//       return require(`./pages/${matchingPage}.vue`).default
//     }
//   },

//   render () {
//     return h(this.ViewComponent)
//   },

//   created () {
//     window.addEventListener('popstate', () => {
//       this.currentRoute = window.location.pathname
//     })
//   }

// }

//createApp(PaginaPrueba)
createApp(PaginaInicio)
  .use(router)
  .use(vuetify)
  .mount('#app')
  
