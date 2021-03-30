<template>
  <div class="choice-wrap">
    <el-divider class="divid" :direction="horizontal" content-position="center">
      <h3 class="title">精<br />选<br />博<br />客</h3>
    </el-divider>
    <el-carousel
      v-if="choices.length"
      @change="changeCar"
      trigger="click"
      :autoplay="false"
      type="card"
      height="400px"
    >
      <el-carousel-item v-for="(item, index) in choices" :key="index">
        <el-tooltip class="item" effect="dark" placement="top">
          <template #content>
            <div class="desc">{{ item.desc }}</div>
          </template>
          <h3 class="medium" @click="toBlog(index, item.blogId)">
            <span class="title" v-if="carIndex === index">{{
              item.title
            }}</span>
            <img :src="`/imgs/${item.img}`" alt="" />
          </h3>
        </el-tooltip>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useChoiceness from "@/composition/useChoiceness";

export default defineComponent({
  name: "Choiceness",
  components: {},
  setup() {
    return {
      ...useChoiceness(),
    };
  },
});
</script>

<style lang="less">
@import "@/styles/var.less";
.choice-wrap {
  position: relative;
  margin: 0 10.3%;
  .divid {
    position: absolute;
    left: -249px;
    top: 170px;
    width: 300px;
    transform: rotate(-90deg);
    .title {
      font-size: 20px;
      color: @primary;
      transform: rotate(90deg);
    }
  }

  .el-divider__text {
    background-color: transparent !important;
  }
  .el-carousel__item--card {
    border-radius: 10px;
  }
  .desc {
    max-width: 400px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    &.medium {
      position: relative;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        line-height: 26px;
        background-image: linear-gradient(to top, black, transparent);
        color: #ddd;
        padding: 0 5px;
        border-radius: 5px;
      }
    }
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>