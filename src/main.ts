import { App, createApp, ref } from 'vue'
import './assets/icon/iconfont.css'
import MainApp from './App.vue'
import router from './router/index'
import { useStore } from './store/index'


const ws = new WebSocket("ws://127.0.0.1:3000/ws");

ws.onopen = function (evt) {  //绑定连接事件
   console.log(evt);
   console.log("Connection open ...");
   ws.send("发送的数据");
};

ws.onmessage = function (evt) {//绑定收到消息事件
   console.log("Received Message: " + evt.data);
};







const app = createApp(MainApp);
app.use(router);
app.use({
   install: (app: App) => {
      console.log("test");
   }
})
app.mount('#app')
