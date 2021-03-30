<template>
  <div class="search-wrap">
    <el-autocomplete
      class="inline-input"
      v-model="keywords"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
      @keyup.enter.native="search"
      value-key="title"
      :highlight-first-item="true"
      :trigger-on-focus="false"
    >
      <template #prepend>
        <el-cascader
          placeholder="全部"
          v-model="searchType"
          @change="changeType"
          :options="searchOption"
          :show-all-levels="false"
          :props="{ expandTrigger: 'hover', emitPath: false }"
          popper-class="header-search-select"
        ></el-cascader>
      </template>
      <template #append>
        <el-button icon="el-icon-search" @click="search"></el-button>
      </template>
    </el-autocomplete>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSearch from "@/composition/useSearch";

export default defineComponent({
  setup() {
    return {
      ...useSearch(),
    };
  },
});
</script>

<style lang="less">
@import url("@/styles/var.less");
.search-wrap {
  .el-input-group {
    border-radius: 30px;
    overflow: hidden;
    .el-cascader .el-input .el-input__inner,
    .el-input__inner,
    .el-input-group__append button.el-button {
      border: none !important;
    }
    .el-input-group__append button.el-button,
    .el-cascader .el-input .el-input__inner {
      background: #fff;
      border-radius: 0;
      &:hover {
        background: @primary;
        opacity: 0.5;
        .el-icon-search {
          color: @dark;
        }
      }
    }
  }
  .el-input-group > .el-input-group__prepend {
    width: 80px;
    padding: 0;
    border: none;
  }
}
.header-search-select {
  height: 153px;
  overflow: hidden;
  .el-cascader-menu {
    min-width: 100px;
  }
  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    color: @primary;
  }
}

.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border: none;
}
</style>