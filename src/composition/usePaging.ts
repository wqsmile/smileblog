import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import storage from "@/utils/storage";

export default function usePaging(blogList) {
  let totalRef = computed(() => {
    return blogList.value.total;
  });
  const store = useStore();
  const route = useRoute();
  const handleCurrentChange = async (newPage: number) => {
    await store.dispatch("blogList/getBlogs", {
      categoryId: store.state.blogList.categoryId,
      page: newPage,
      userId: route.name === "person" ? storage.get("id") : 0,
    });
  };
  return {
    currentPage: computed(() => store.state.blogList.currentPage),
    total: totalRef,
    handleCurrentChange,
  };
}
