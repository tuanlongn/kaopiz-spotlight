export default {
  namespaced: true,
  state: {
    booted: false,
  },
  mutations: {
    SET_BOOTED: (state) => {
      state.booted = true;
    },
  },
  actions: {
    async boot({ commit, dispatch }) {
      await dispatch("user/getInfo", null, { root: true });
      commit("SET_BOOTED");
    },
  },
};
