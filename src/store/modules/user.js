import router from "../../router";
import { getMyInfoApi, setAccessToken } from "../../services/api";
import storage from "../../services/storage";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    info: {},
  },
  mutations: {
    SET_IS_AUTHENTICATED: (state, status) => {
      state.isAuthenticated = status;
    },
    SET_INFO: (state, data) => {
      state.info = data;
    },
    RESET: (state) => {
      state.info = {};
    },
  },
  actions: {
    async getInfo({ commit }) {
      const token = storage.get("token");
      if (token) {
        setAccessToken(token);

        const res = await getMyInfoApi();
        if (res.status === 200) {
          commit("SET_IS_AUTHENTICATED", true);
          commit("SET_INFO", res.data);
        }
      }
    },
    logout({ commit }) {
      setAccessToken(null);
      storage.remove("token");
      commit("RESET");

      router.push("/login");
    },
  },
};
