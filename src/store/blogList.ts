import { getBlogs } from "@/api/blog";
import { IBlogList } from "@/interface/IBlog";

export default {
  namespaced: true,
  state: {
    blogList: {},
    categoryId: 0,
    currentPage: 1,
  },
  mutations: {
    setBlogList(state, payload) {
      state.blogList = payload;
    },
    setCategoryId(state, payload) {
      state.categoryId = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    async getBlogs({ commit }, payload: IBlogList) {
      payload && payload.page && commit("setCurrentPage", payload.page);
      const blogList = await getBlogs(payload);
      commit("setBlogList", blogList);
      payload && commit("setCategoryId", payload.categoryId || 0);
      return blogList;
    },
  },
};
