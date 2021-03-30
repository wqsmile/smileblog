import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import storage from "@/utils/storage";

export default function useBlogList() {
  const route = useRoute();
  const store = useStore();
  (async () => {
    await store.dispatch("blogList/getBlogs", {
      userId: route.name === "person" ? storage.get("id") : 0,
      getPrivate: route.name === "person" ? true : null,
      keyword: route.params.title || "",
    });
  })();

  return {
    blogList: computed(() => {
      return store.state.blogList.blogList || {};
    }),
  };
}
