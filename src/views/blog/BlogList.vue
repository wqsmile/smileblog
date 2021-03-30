<template>
  <CHoiceness v-if="routeName === 'blog'" />
  <div class="blog-list">
    <div
      class="blog-list-container"
      :class="{ mr: isShowCategory }"
      ref="mainContainer"
    >
      <ul>
        <li v-for="item in blogList.data" :key="item.id">
          <div class="thumb">
            <a
              :href="'http://localhost:3000/#/blog/' + item.id"
              target="_blank"
            >
              <!-- <img :src="`/imgs/${item.img}`" alt="该文章没有主题图片" /> -->
              <div
                class="img"
                :style="{ backgroundImage: `url('/imgs/${item.img}')` }"
              ></div>
            </a>
          </div>
          <div class="main">
            <a
              :href="'http://localhost:3000/#/blog/' + item.id"
              target="_blank"
            >
              <h2>{{ item.title }}</h2>
            </a>
            <div class="aside">
              <span
                ><i class="iconfont">&#xe615;</i
                >{{ formatDate(item.createdAt) }}</span
              >
              <span><i class="iconfont">&#xe693;</i>{{ item.browserNum }}</span>
              <!-- <a href="#data-form-container">评论: {{ item.commentNum }}</a> -->
              <span><i class="iconfont">&#xe63a;</i>{{ item.commentNum }}</span>
              <span
                ><i class="iconfont">&#xe60c;</i>{{ item.likes?.length }}</span
              >
              <span><i class="iconfont">&#xe63d;</i>{{ item.theme }}</span>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
        </li>
      </ul>
      <Paging
        v-if="blogList.data && blogList.data.length"
        :currentPage="currentPage"
        :total="total"
        :handleCurrentChange="handleCurrentChange"
      ></Paging>
    </div>
    <category-blog
      :isShowCategory="isShowCategory"
      @handleCategory="handleCategory"
    ></category-blog>
  </div>
  <el-empty
    v-if="blogList.data && !blogList.data.length"
    :image-size="200"
    :description="
      routeName === 'blog'
        ? '搜索不到相关博客哦~可以换一个关键词搜索'
        : '您还没有发表博客，快去发表吧~'
    "
  ></el-empty>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useBlogList from "@/composition/blog/useBlogList";
import formatDate from "@/utils/formatDate";
import Paging from "@/components/Paging.vue";
import usePaging from "@/composition/usePaging";
import CategoryBlog from "@/views/blog/CategoryBlog.vue";
import useHandleCategory from "@/composition/useHandleCategory";
import CHoiceness from "./Choiceness.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "BlogList",
  components: {
    Paging,
    CategoryBlog,
    CHoiceness,
  },
  setup() {
    const { blogList } = useBlogList();
    const route = useRoute();
    return {
      blogList,
      formatDate,
      ...usePaging(blogList),
      ...useHandleCategory(),
      routeName: route.name,
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";
.blog-list {
  display: flex;
  .blog-list-container {
    line-height: 1.7;
    position: relative;
    padding: 20px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    transition: margin-right 1s;
    &.mr {
      margin-right: 200px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #bcd;
        .thumb {
          flex: 0 0 auto;
          margin-right: 15px;
          .img {
            box-shadow: 0 0 10px @gray;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-size: cover;
            &:hover {
              box-shadow: 0 0 10px @primary;
            }
          }
        }
        .main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .aside {
          font-size: 12px;
          color: #686868;
          span {
            margin-right: 25px;
            i {
              margin-right: 5px;
            }
          }
        }
        .desc {
          margin: 15px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>