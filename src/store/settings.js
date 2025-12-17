export default {
  namespaced: true,

  state: () => ({
    theme: "dark",
    notificationsEnabled: true,
  }),

  getters: {
    theme: (state) => state.theme,
  },

  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
    },
  },

  actions: {
    updateTheme({ commit }, theme) {
      commit("SET_THEME", theme);
    },
  },
};
