<template>
  <blog-list></blog-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setAsyncComponent } from "@/utils/setAsyncComponent";

const BlogList = setAsyncComponent("../views/blog/BlogList.vue");

export default defineComponent({
  name: "Blog",
  components: {
    BlogList,
  },
  setup() {},
});
</script>

<style scoped lang="less">
</style>