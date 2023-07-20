import { createApp } from 'vue'
import App from './App.vue'

// 引入组件库的少量全局样式变量
// import 'tdesign-vue-next/es/style/index.css';
const app = createApp(App)
// app.use(TDesign) 使用按需引入

app.mount('#app')
