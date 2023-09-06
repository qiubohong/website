<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const loadRemoteComponent = async (url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = () => {
            resolve(window.AsyncComponent)
        }
        script.onerror = () => {
            reject(new Error('Failed to load remote component'))
        }
        document.head.appendChild(script)
    })
}

const AsyncComponent: any = defineAsyncComponent(()=>{
    return new Promise((resolve)=>{
        loadRemoteComponent('/Async.js').then((RemoteComponent)=>resolve(RemoteComponent))
    })
})
</script>
<template>
    <h3>测试 Supsense</h3>
    <Suspense>
        <!-- 具有深层异步依赖的组件 -->
        <AsyncComponent />
        <!-- 在 #fallback 插槽中显示 “正在加载中” -->
        <template #fallback>
            <h1>正在加载中...</h1>
        </template>
    </Suspense>
</template>