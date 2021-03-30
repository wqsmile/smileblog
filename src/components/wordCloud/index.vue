<template>
  <div class="wc-wrap">
    <svg
      :width="width"
      :height="height"
      @mousemove="stopMove"
      @mouseleave="move"
    >
      <a :href="tag.href" v-for="tag in tags" target="_blank">
        <text
          :x="tag.x"
          :y="tag.y"
          :font-size="20 * (600 / (600 - tag.z))"
          :fill-opacity="(400 + tag.z) / 600"
          fill="white"
          text-anchor="middle"
          class="svg-text__shaded bold"
        >
          {{ tag.text }}
        </text>
      </a>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordCloud from "@/composition/useWordCloud";

export default defineComponent({
  setup() {
    return {
      ...useWordCloud(),
    };
  },
});
</script>

<style scoped lang="less">
.wc-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top: 60px;
  background: url("../../assets/imgs/wc-bg.jpg") no-repeat center / cover;
  .svg-text__shaded {
    text-shadow: 0 0.004em 0.01em rgba(0, 0, 0, 0.025), 0 0.005em 0 #e6e6e6,
      0 0.01em 0 #e6e6e6, 0 0.015em 0 #e6e6e6, 0 0.02em 0 #e6e6e6,
      0 0.025em 0 #e6e6e6, 0 0.025em 0.02em rgba(33, 33, 33, 0.5),
      0 0.028em 0.2em rgba(33, 33, 33, 0.85);
  }
  .bold {
    font-family: "Kreon", sans-serif;
  }
}
</style>