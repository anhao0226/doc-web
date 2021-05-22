import { App, createApp, ref } from 'vue'
import './assets/icon/iconfont.css'
import MainApp from './App.vue'
import router from './router/index'
import { useStore } from './store/index'

const app = createApp(MainApp);
app.use(router);
app.use({ install: (app: App) => {
   console.log("test");
}})
app.mount('#app')
