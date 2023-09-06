import * as Vue from 'vue'
import App from './App.vue'
import router from './router'


// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
const app = Vue.createApp(App)
app.use(router)
app.mount('#app')


window.Vue = Vue

console.log('window', window.Vue)

