<template>
  <div class="comment-wrap">
    <el-input
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 8 }"
      maxlength="200"
      show-word-limit
      placeholder="评论区..."
      v-model="comment"
      @keyup.enter="handleComment"
      resize="none"
    >
    </el-input>
    <el-button type="primary" plain size="mini" @click="handleComment">
      <i class="iconfont">&#xe60d;</i>发表
    </el-button>
  </div>
  <ul class="comment-list-wrap">
    <li v-for="(item, index) in comments" :key="index">
      <Avatar :src="`/imgs/${item.profile}`" :size="50" />
      <div class="data">
        <div class="nickname">{{ item.username }}</div>
        <div class="content">{{ item.comment }}</div>
        <div class="time">{{ formatDate(+item.time) }}</div>
      </div>
    </li>
  </ul>
  <el-empty v-if="!comments" description="暂无评论"></el-empty>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import formatDate from "@/utils/formatDate";
import useComment from "@/composition/useComment";
import Avatar from "@/components/Avatar";

export default defineComponent({
  name: "Comment",
  components: {
    Avatar,
  },
  setup() {
    return {
      formatDate,
      ...useComment(),
    };
  },
});
</script>

<style lang="less">
@import "@/styles/var.less";
.comment-wrap {
  .el-input__inner {
    height: 120px !important;
  }
  .el-button {
    margin-left: calc(100% - 72px);
    margin-top: 10px;
    color: @primary;
    i {
      margin-right: 3px;
      font-size: 13px;
    }
    &:hover {
      color: #eee;
      border: none;
      background: @primary;
    }
  }
}
.comment-list-wrap {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    border-bottom: 1px solid #bcd;
    padding: 15px 0;
    .data {
      flex: 1 1 auto;
      position: relative;
      margin-top: -3px;
      margin-left: 10px;
      .nickname {
        color: darken(@success, 10%);
        margin-bottom: 10px;
      }
      .content {
        font-size: 14px;
      }

      .time {
        position: absolute;
        right: 0;
        top: 5px;
        font-size: 12px;
        color: @gray;
      }
    }
  }
}
</style>