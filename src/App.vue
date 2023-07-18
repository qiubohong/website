<script setup lang="ts">
import ListWebSite from "./components/ListWebSite.vue";
</script>
<template>
  <div class="tdesign-demo-item--layout">
    <t-layout>
      <t-header>
        <t-head-menu :theme="isDark ? 'dark' : 'light'" v-model="currentMenu" height="120px">
          <template #logo>
            <img width="136" class="logo" src="./assets/logo-cover.png" :class="`${isDark ? 'dark' : ''}`" alt="logo" />
          </template>
          <t-menu-item value="used"> 常用网站 </t-menu-item>
          <t-menu-item value="self"> 个人网站 </t-menu-item>
          <t-menu-item value="today"> 每日必学 </t-menu-item>
          <t-menu-item value="book"> 在读书籍 </t-menu-item>
          <t-menu-item value="blog"> 博客收集 </t-menu-item>
          <t-menu-item value="framework"> 开源框架 </t-menu-item>
          <t-menu-item value="learn"> 学习资源 </t-menu-item>
          <t-menu-item value="week"> 技术周刊 </t-menu-item>
          <t-menu-item value="lowcode"> 低代码相关 </t-menu-item>
          <t-menu-item value="time"> 定期重温学习 </t-menu-item>
          <t-menu-item value="other"> 其他收集 </t-menu-item>
          <t-menu-item value="jobs"> 找工作 </t-menu-item>

          <template #operations>
            <t-button @click="setDark" :theme="isDark ? 'dark' : 'light'">
              {{ isDark ? '白天' : '夜晚' }}
            </t-button>
          </template>
        </t-head-menu>
      </t-header>
      <t-content>
        <div style="padding: 16px; border-top: 1px solid #ccc">
          <div style="
              width: 50%;
              min-width: 500px;
              border: 1px solid #ccc;
              margin: 0 auto;
            ">
            <list-web-site :list="currentList"></list-web-site>
          </div>
        </div>
      </t-content>
      <t-footer>
        <div style="text-align: center;">
          borfyqiu 学习站点，天天向上，好好学习！
        </div>
      </t-footer>
    </t-layout>
  </div>
</template>
<script lang="ts">
interface WebSite {
  currentMenu: any;
  currentList: any;
  allData: any;
  isDark: boolean;
}
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
    return {
      currentMenu: localStorage.getItem("currentMenu") || "learn",
      currentList: [],
      allData: {},
      isDark: false,
    } as WebSite;
  },
  created() {
    this.getData();
    const now = new Date();
    if (localStorage.getItem("isDark") === undefined) {
      const hour = now.getHours();
      if (hour < 6 || hour > 18) {
        this.isDark = true;
        document.documentElement.setAttribute('theme-mode', 'dark');
      }
    } else {
      const isDark = localStorage.getItem("isDark") == 'dark' ? true : false
      if (isDark) {
        this.isDark = true;
        document.documentElement.setAttribute('theme-mode', 'dark');
      } else {
        this.isDark = false;
        document.documentElement.setAttribute('theme-mode', 'light');
      }
    }
  },
  watch: {
    currentMenu(newVal) {
      if (this.currentMenu === "used") {
        this.getUsedData();
      } else {
        this.currentList = this.allData[this.currentMenu];
      }
      localStorage.setItem("currentMenu", newVal);
      return newVal;
    },
  },
  methods: {
    getData() {
      fetch("/website.json")
        .then((res) => res.json())
        .then((data) => {
          this.allData = data;
          if (this.currentMenu === "used") {
            this.getUsedData();
          } else {
            this.currentList = this.allData[this.currentMenu];
          }
        });
    },

    getUsedData() {
      try {
        this.currentList = JSON.parse(localStorage.getItem("usedList") || "[]");
      } catch (e) {
        this.currentList = this.allData.self || [];
      }
    },

    setDark() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.setAttribute('theme-mode', 'dark');
        localStorage.setItem("isDark", 'dark');
      } else {
        document.documentElement.setAttribute('theme-mode', 'light');
        localStorage.setItem("isDark", 'light');
      }
    }
  },
});
</script>
<style scoped>
img.dark {
  filter: invert(1) hue-rotate(180deg);
}
</style>
