import { ref } from "vue";
import { getBlog } from "@/api/blog";
import getBlogId from "@/utils/getBlogId";
import { useStore } from "vuex";

export default function useBlogDetail(id) {
  const blogDetailRef = ref({});
  const commentRef = ref("");
  const blogIdRef = ref(getBlogId());
  const store = useStore();

  (async () => {
    blogDetailRef.value = await getBlog(id);
    console.log(blogDetailRef.value);

    store.commit("like/setLikes", blogDetailRef.value.likes);
  })();

  return {
    blog: blogDetailRef,
    comment: commentRef,
    blogId: blogIdRef,
  };
}
