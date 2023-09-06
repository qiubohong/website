<script lang="ts" setup>
import { ref } from "vue";
import ListWebSite from "./ListWebSite.vue";
const list = ref([]);

const getData = async () => {
  return new Promise((resolve)=>{
    setTimeout(()=>{
        fetch("/website.json")
        .then((res) => res.json())
        .then((data) => {
            list.value = data.learn;
            resolve(data.learn);
        });
    }, 2000)
  })
};
await getData();

</script>
<template>
<p class="test">我是一个测试异步组件的样式描述</p>
<list-web-site :list="list"></list-web-site>
</template>
<style scoped>
.test{
  font-size:32px;
  color:#f00;
}
</style>