import { ref, computed } from "vue";
import { useStore } from "vuex";
import debounce from "@/utils/debounce";
import { getBlogsTitle } from "@/api/blog";

const baseOption = [
  {
    value: "",
    label: "全部",
  },
  {
    value: "title",
    label: "标题",
  },
  {
    value: "content",
    label: "内容",
  },
];

export default function useSearch() {
  const store = useStore();
  const searchOptionComp = computed(() => {
    return [
      ...baseOption,
      {
        value: "theme",
        label: "主题",
        children: store.state.category.data.slice(1).map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        }),
      },
    ];
  });
  (async () => {
    await store.dispatch("category/getTypes");
  })();

  const keywordsRef = ref("");
  const searchListRef = ref([]);
  const searchType = ref("");

  const search = async () => {
    await store.dispatch("blogList/getBlogs", getSearchParams());
  };

  const querySearch = async (qs, cb) => {
    if (!qs) return;
    debounce(async function () {
      searchListRef.value = await getBlogsTitle(getSearchParams());
      // 调用 callback 返回建议列表的数据
      cb(searchListRef.value);
    }, 800);
  };
  const handleSelect = async () => {
    await store.dispatch("blogList/getBlogs", getSearchParams());
  };

  function getSearchParams() {
    return {
      keyword: keywordsRef.value.trim(),
      searchType: isNaN(+searchType.value) ? searchType.value : "",
      categoryId: isNaN(+searchType.value) ? 0 : +searchType.value,
    };
  }
  return {
    keywords: keywordsRef,
    search,
    handleSelect,
    querySearch,
    searchType,
    searchOption: searchOptionComp,
  };
}
