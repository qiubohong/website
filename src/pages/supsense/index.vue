<script lang="ts" setup>

/**
 * Suspense 组件的 pending 进入挂起状态时触发
 */
const pending = () => {
    console.log('pending')
}

/**
 * Suspense 组件的 resolve在 default 插槽完成获取新内容时触
 */
const resolve = () => {
    console.log('resolve')
}

/**
 * Suspense 组件的  fallback 插槽的内容显示时触发
 */
const fallback = () => {
    console.log('fallback')
}
</script>
<template>
    <h3>测试 Supsense</h3>
    <Suspense @pending="pending" @resolve="resolve" @fallback="fallback">
        <!-- 具有深层异步依赖的组件 -->
        <!-- <AsyncComponentTest /> -->
        <AsyncComponent />

        <!-- 在 #fallback 插槽中显示 “正在加载中” -->
        <template #fallback>
            <h1>正在加载中...</h1>
        </template>
    </Suspense>
</template>
<script lang="ts">
import { defineAsyncComponent } from 'vue';
/**
 * 加载远端+解析组件
 * @param url 
 */
const loadRemoteComponent = async (url: string) => {
    const response = await fetch(url);
    const scriptText = await response.text()
    let Component: any = '';
    try {
        const scriptStr = scriptText.replace('export default', '')
        Component = new Function('return ' + scriptStr)()
        console.log(Component)
    } catch (e) {
        console.error(e)
    }
    return Component
}

const AsyncComponentTest: any = defineAsyncComponent(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            loadRemoteComponent('/async/demo.js').then((Component) => {
                resolve(Component)
            });
        }, 2000);
    })
})

const AsyncComponent = defineAsyncComponent(() => import("@/components/Async.vue"))

export default {
    components: {
        AsyncComponentTest,
        AsyncComponent
    }
}
</script>