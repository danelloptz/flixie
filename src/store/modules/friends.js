export default {
  namespaced: true,

  state: () => ({
    friends: [],
  }),

  getters: {
    friends: (state) => state.friends,
  },

  mutations: {
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
  },

  actions: {
    loadFriends({ commit }) {
      // заглушка
      commit("SET_FRIENDS", [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]);
    },
  },
};
