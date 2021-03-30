import * as userServ from "@/api/user";

export default {
  namespaced: true,
  state: {
    username: "",
    profile: "logo.png",
    loading: false,
  },
  mutations: {
    setUser(state, { username, profile }) {
      state.username = username;
      state.profile = profile;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      commit("setLoading", true);
      const user = await userServ.login(username, password);
      user && commit("setUser", user);
      commit("setLoading", false);
      return user;
    },
    async loginOut({ commit }) {
      commit("setLoading", true);
      await userServ.loginOut();
      commit("setUser", null);
      commit("setLoading", false);
    },
    whoAmI({ commit }) {
      commit("setLoading", true);
      const user = userServ.whoami();
      user && commit("setUser", user);
      commit("setLoading", false);
    },
  },
};
