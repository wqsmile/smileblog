export default {
  namespaced: true,
  state: {
    likes: [],
  },
  mutations: {
    setLikes(state, payload) {
      state.likes = payload ?? [];
      console.log(state.likes);
    },
  },
};
