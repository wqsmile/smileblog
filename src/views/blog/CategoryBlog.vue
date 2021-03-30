<template>
  <div class="category" :class="{ 'hide-wrap': !isShowCategory }">
    <h3>博客分类</h3>
    <ul class="types">
      <li
        v-for="(item, index) in blogType"
        :key="index"
        @click="selectType(item.id)"
        :class="{ active: item.id === currentType }"
      >
        <span>
          {{ item.name }}
        </span>
        <span class="aside" v-if="routeName !== 'person'">
          {{ item.num }}篇
        </span>
      </li>
    </ul>
    <div :class="{ ml: !isShowCategory }" class="hide" @click="handleCategory">
      <i :class="{ shrink: isShowCategory }" class="iconfont">&#xe6a5;</i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBlogType from "@/composition/blog/useBlogType";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CategoryBlog",
  emits: ["handleCategory"],
  props: ["isShowCategory"],
  setup(p, ctx) {
    const handleCategory = () => {
      ctx.emit("handleCategory");
    };
    const route = useRoute();
    return {
      ...useBlogType(),
      handleCategory,
      routeName: route.name,
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";

.category {
  position: fixed;
  right: 0;
  top: 60px;
  width: 200px;
  height: 100%;
  text-align: center;
  transition: margin-right 1s;
  background-image: linear-gradient(to bottom, #cfd9df 0%, #a8edea 100%);
  border-left: 1px solid #999;
  h3 {
    font-weight: normal;
    color: @words;
  }
  &.hide-wrap {
    margin-right: -200px;
  }
  .types {
    li {
      min-height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: @primary;
        color: @dark !important;
        opacity: 0.7;
      }
      &.active {
        color: @primary;
        font-weight: bold;
      }
      .aside {
        font-size: 12px;
        margin-left: 1em;
      }
    }
  }
  .hide {
    position: absolute;
    width: 20px;
    height: 50px;
    background: transparent;
    left: -21px;
    top: calc(50% - 25px);
    border-radius: 5px 0 0 5px;
    line-height: 50px;
    border: 1px solid #999;
    border-right: none;
    cursor: pointer;
    transition: margin-left 1s;
    &.ml {
      margin-left: -18px;
      border-right: 1px solid #999;
    }
    .shrink {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
}
</style>