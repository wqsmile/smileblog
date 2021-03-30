<template>
  <ul class="header-nav">
    <li v-for="(item, index) in headerBar" :key="index">
      <router-link
        :class="{ 'font-hovered': item.name === rName }"
        class="nav-item"
        :to="item.path"
        >{{ item.label }}</router-link
      >
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HeaderBar",
  setup() {
    const rNameRef = ref("home");
    const headerBar = [
      { name: "home", path: "/", label: "发现" },
      { name: "blog", path: "/blog", label: "博客" },
      { name: "person", path: "/person", label: "我的" },
    ];
    const route = useRoute();

    watch(
      () => route.name,
      (name) => {
        rNameRef.value = name;
      }
    );
    return {
      headerBar,
      rName: rNameRef,
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";
.header-nav {
  display: flex;
  li {
    .nav-item {
      display: inline-block;
      padding: 0 20px;
      text-align: center;
    }
    a {
      .font-hover();
    }
  }
}
</style>