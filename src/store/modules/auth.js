export default {
  namespaced: true,

  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  actions: {
    login({ commit }, payload) {
      // заглушка
      const mockUser = {
        id: 1,
        email: payload.email,
        name: "Flixie User",
      };

      commit("SET_USER", mockUser);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },
};
