<template>
  <el-container>
    <el-header>
      <blog-header />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/views/header";

export default defineComponent({
  name: "App",
  components: {
    BlogHeader: Header,
  },
});
</script>

<style lang="less">
.el-header {
  background-image: linear-gradient(to top, #cfd9df 0%, #c1dfc4 100%);
  position: fixed;
  width: 100%;
  z-index: 1001;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  // background-color: #e9eef3;
  margin-top: 60px;
  color: #333;
  padding: 0;
}

#app > .el-container {
  height: 100%;
  margin-bottom: 40px;
}
</style>