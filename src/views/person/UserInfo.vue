<template>
  <div class="user-info">
    <!-- <div class="username">
      <el-input placeholder="请输入内容" v-model="username">
        <template #prepend>昵称</template>
      </el-input>
      <el-button type="primary" @click="handleSubmit('username', username)"
        >提交</el-button
      >
    </div> -->
    <div class="profile">
      <img class="pro-img" :src="img ? img : `/imgs/${profile}`" alt="" />
      <!-- <el-button type="primary" @click="handleSubmit('profile', profile)"
        >提交</el-button
      > -->
      <!-- <div
        v-if="img"
        class="temp-img"
        :style="{ backgroundImage: `url('${img}')` }"
      ></div> -->
      <input type="file" accept="image/*" ref="inputFile" @change="upload" />
    </div>
    <div class="desc">
      <el-input placeholder="请输入内容" v-model="desc">
        <template #prepend>个人简介</template>
      </el-input>
      <el-button type="primary" @click="handleSubmit('desc', desc)"
        >提交</el-button
      >
    </div>
    <div class="tag">
      <el-tag
        :key="index"
        v-for="(item, index) in tag"
        closable
        :disable-transitions="false"
        @close="handleClose('tag', item)"
      >
        {{ item }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm('tag', inputValue)"
        @blur="handleInputConfirm('tag', inputValue)"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ New Tag</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useUserInfo from "@/composition/useUserInfo";

export default defineComponent({
  name: "UserInfo",
  setup() {
    return {
      ...useUserInfo(),
    };
  },
});
</script>

<style scoped lang="less">
.user-info {
  .profile {
    .pro-img {
      width: 100px;
      height: 100px;
    }
    .temp-img {
      width: 200px;
      height: 200px;
      background-size: cover;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>