import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "./store";
import { FontAwesomeIcon } from './plugins/font-awesome'

const app = createApp(App)
app.config.globalProperties.$store = store;
app.use(router).use(store)
.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
