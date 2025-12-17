export default {
  namespaced: true,

  state: () => ({
    notifications: [],
  }),

  getters: {
    notifications: (state) => state.notifications,
  },

  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
  },

  actions: {
    loadNotifications({ commit }) {
      commit("SET_NOTIFICATIONS", [
        { id: 1, text: "New friend request" },
        { id: 2, text: "Session starting soon" },
      ]);
    },
  },
};
