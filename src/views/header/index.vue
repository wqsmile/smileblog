<template>
  <div class="header">
    <h1 class="logo"><router-link to="/">SMILEBLOG</router-link></h1>
    <Header-bar />
    <Search-blog />
    <Person />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Person from "./Person.vue";
import HeaderBar from "./HeaderBar.vue";
import SearchBlog from "@/components/search";

export default defineComponent({
  name: "Header",
  components: {
    Person,
    HeaderBar,
    SearchBlog,
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";
.header {
  display: flex;
  justify-content: space-between;
  color: #434343;
}
</style>