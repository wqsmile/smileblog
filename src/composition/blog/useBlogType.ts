import { ref, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import storage from "@/utils/storage";

export default function useBlogType() {
  const store = useStore();
  const route = useRoute();
  const currentTypeRef = ref(0);

  // const blogTypeRef = ref([]);

  const selectType = async (id) => {
    // blogTypeRef.value = blogTypeRef.value.map((item) => {
    //   if (id === item.id) {
    //     item.isSelect = true;
    //   } else if (item.isSelect) {
    //     item.isSelect = false;
    //   }
    //   return item;
    // });
    currentTypeRef.value = id;
    (async () => {
      await store.dispatch("blogList/getBlogs", {
        categoryId: id,
        page: 1,
        userId: route.name === "person" ? storage.get("id") : 0,
      });
    })();
  };
  return {
    blogType: computed(() => store.state.category.data),
    selectType,
    currentType: currentTypeRef,
  };
}
