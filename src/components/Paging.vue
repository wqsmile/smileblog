<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      page-size="5"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import usePaging from "@/composition/usePaging";
import useBlogList from "@/composition/blog/useBlogList";
export default defineComponent({
  name: "Paging",
  props: {
    total: {
      type: Number,
      default: 5,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    handleCurrentChange: Function,
  },
  // setup(props) {
  //   // const { blogList } = useBlogList();
  //   return {
  //     // ...usePaging(blogList),
  //     total: props.total,
  //     currentPage: props.currentPage,
  //     handleCurrentChange: props.handleCurrentChange,
  //   };
  // },
});
</script>

<style scoped lang="less">
.el-pagination {
  text-align: center;
  margin-top: 10px;
}
</style>