import { createApp} from 'vue'
// import LoginSecundario from './components/LoginSecundario.vue'
/* eslint-disable no-unused-vars */
import App from './App.vue'
import createStore from './store/index'
/* eslint-disable no-unused-vars */
import Vista from './components/Vista'
/* eslint-disable no-unused-vars */
// import PaginaPrincipal from './components/PaginaPrincipal'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
// import axios from "axios";
/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'

// Vue.prototype.$axios = axios; // Para hacer llamadas HTTP desde cualquier componente
// Vue.config.productionTip = false // Para que no salga el mensaje de que estamos en modo desarrollo

loadFonts()

// createApp(Vista).use(createStore).use(router).mount('#app')

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createStore)
  .mount('#app')
  
