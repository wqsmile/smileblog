<template>
  <User-info></User-info>
  <my-blog> </my-blog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyBlog from "@/views/blog/BlogList.vue";
import UserInfo from "./UserInfo.vue";
export default defineComponent({
  name: "Person",
  components: {
    MyBlog,
    UserInfo,
  },
  setup() {},
});
</script>

<style scoped lang="less">
</style>