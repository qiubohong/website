import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import Home from './pages/Home.vue'
import TestSupsense from './pages/supsense/index.vue'
import TestSupsense2 from './pages/supsense/index2.vue'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: [
        {   // 首页
            path: '/',
            name: 'Home',
            component: Home
        },
        {   
            path: '/testsupsense',
            name: 'testsupsense',
            component: TestSupsense
        },
        {   
            path: '/testsupsense2',
            name: 'testsupsense2',
            component: TestSupsense2
        },
    ], 
})

export default router;