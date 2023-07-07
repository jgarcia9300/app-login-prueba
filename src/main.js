import { createApp} from 'vue'
//import App from './App.vue'
import Vista from './components/Vista'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

createApp(Vista)
  .use(router)
  .use(vuetify)
  .mount('#app')
  
