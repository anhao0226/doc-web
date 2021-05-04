import { createApp, ref } from 'vue'
import './assets/icon/iconfont.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App);

interface ComponentArgs {
    uid: number
    state: boolean
}

// select 保存下拉框
app.mixin({
    select: ref<ComponentArgs[]>([])
})
app.use(router);
app.mount('#app')
