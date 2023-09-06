<template>
  <t-list :split="true">
    <t-list-item v-for="item in list" :key="item.title">
      <t-list-item-meta :title="item.title">
        <template #description>
          <t-row>
            <t-col style="flex-basis: fit-content">描述：</t-col>
            <t-col :span="10">{{ item.description }}</t-col>
          </t-row>
          <t-row>
            <t-col style="flex-basis: fit-content">网址：</t-col>
            <t-col :span="10">
              <span
                style="color: rgb(117 222 220); cursor: pointer"
                @click="goToLink(item)"
                >{{ item.url }}</span
              >
            </t-col>
          </t-row>
          <t-row v-if="item.status !== undefined" ty>
            <t-col style="flex-basis: fit-content">状态：</t-col>
            <t-col :span="10">
              <t-tag theme="default" v-if="item.status == 0">未读</t-tag>
              <t-tag theme="primary" v-if="item.status == 1">在读</t-tag>
              <t-tag theme="success" v-if="item.status == 2">读完</t-tag>
            </t-col>
          </t-row>
        </template>
      </t-list-item-meta>
      <template #action>
        <span>
          <t-button variant="outline" @click="goToLink(item)">
            <template #icon>
              <t-icon name="link" />
            </template>
            前往访问
          </t-button>
        </span>
      </template>
    </t-list-item>
  </t-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'ListWebSite',
  props: {
    list: {
      type: Array as any,
      default: [],
      required: true,
    },
  },
  methods: {
    goToLink(item: any) {
      window.open(item.url);
      let usedList: any = [];
      try {
        usedList = JSON.parse(localStorage.getItem("usedList") || "[]");
      } catch (e) {
        usedList = [];
      }
      usedList.push(item);
      const map: any = {};
      usedList.forEach((u: any) => {
        map[u.url] = u;
      });
      usedList = Object.keys(map).map((key) => map[key]);
      // 只保留前十个
      usedList.splice(10);
      localStorage.setItem("usedList", JSON.stringify(usedList));
    },
  },
});
</script>

<style>
.t-list-item__meta,
.t-list-item__meta-content {
  flex: 1;
}
</style>
