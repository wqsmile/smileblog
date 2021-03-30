import { getType } from "@/api/blog";

export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    setData(state, payload) {
      state.data = payload || [];
    },
  },
  actions: {
    async getTypes({ commit }) {
      const res = await getType();
      commit("setData", res);
    },
  },
};
