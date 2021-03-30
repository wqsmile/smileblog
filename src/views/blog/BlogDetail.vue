<template>
  <div class="detail-wrap">
    <div class="left">
      <h2>{{ blog.title }}</h2>
      <h4>{{ blog.desc }}</h4>
      <div class="top" v-if="blog.theme">
        <span
          ><i class="iconfont">&#xe615;</i
          >{{ formatDate(blog.createdAt) }}</span
        >
        <span><i class="iconfont">&#xe693;</i>{{ blog.browserNum }}</span>
        <!-- <a href="#data-form-container">评论: {{ blog.commentNum }}</a> -->
        <span><i class="iconfont">&#xe63a;</i>{{ blog.commentNum }}</span>
        <span><i class="iconfont">&#xe60c;</i>{{ blog.likes?.length }}</span>
        <span><i class="iconfont">&#xe63d;</i>{{ blog.theme }}</span>
      </div>
      <v-md-editor
        v-model="blog.content"
        height="100%"
        mode="preview"
      ></v-md-editor>
    </div>
    <div class="right">
      <!-- 点赞 -->
      <div class="operator">
        <div class="like">
          <el-button @click="handleLike(isLike)">
            <i class="iconfont">{{ isLike ? "&#xe60c;" : "&#xe601;" }}</i>
          </el-button>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comments">
        <Comment v-if="blog.isComment" :id="blogId" />
        <el-empty v-else description="该文章没有开启评论"></el-empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import formatDate from "@/utils/formatDate";
// import "highlight.js/styles/github.css";
import { useRoute } from "vue-router";
import useBlogDetail from "@/composition/blog/useBlogDetail";
import Comment from "@/components/Comment.vue";
import useLike from "@/composition/useLike";

export default defineComponent({
  name: "BlogDetail",
  components: {
    Comment,
  },
  setup() {
    const route = useRoute();
    return {
      formatDate,
      ...useBlogDetail(route.params.id),
      ...useLike(),
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";

.detail-wrap {
  display: flex;
  overflow-y: hidden;
  height: 100%;
  box-sizing: border-box;
  // padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .left {
    width: 70%;
    h4 {
      margin: 10px 0;
    }
    .top {
      margin-bottom: 10px;
      font-size: 12px;
      color: @gray;
      span {
        margin-right: 25px;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .right {
    position: relative;
    width: 30%;
    margin-left: 15px;
    .comments {
      // margin-top: 71px;
    }
    .operator {
      height: 101px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .like {
        i {
          font-size: 24px;
          color: @primary;
        }
      }
    }
  }
}
</style>