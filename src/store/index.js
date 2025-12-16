import { createStore } from "vuex";
import auth from "./modules/auth";
import friends from "./modules/friends";
import sessions from "./modules/sessions";
import notifications from "./modules/notifications";
import settings from "./modules/settings";

export default createStore({
  modules: {
    auth,
    friends,
    sessions,
    notifications,
    settings,
  },
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
