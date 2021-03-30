<template>
  <Word-cloud></Word-cloud>
  <Blog-footer></Blog-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WordCloud from "@/components/wordCloud";
import BlogFooter from "./BlogFooter.vue";

export default defineComponent({
  name: "Home",
  components: {
    WordCloud,
    BlogFooter,
  },
  setup() {},
});
</script>

<style scoped lang="less">
</style>