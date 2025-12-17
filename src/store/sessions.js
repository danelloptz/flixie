export default {
  namespaced: true,

  state: () => ({
    sessions: [],
  }),

  getters: {
    sessions: (state) => state.sessions,
  },

  mutations: {
    SET_SESSIONS(state, sessions) {
      state.sessions = sessions;
    },
  },

  actions: {
    loadSessions({ commit }) {
      commit("SET_SESSIONS", [
        { id: 1, movie: "Inception" },
        { id: 2, movie: "Matrix" },
      ]);
    },
  },
};
