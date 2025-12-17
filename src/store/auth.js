import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    user: null,
  }),

  getters: {
    isAuth: (state) => !!state.accessToken,
  },

  actions: {
    login({ access_token, refresh_token, user = null }) {
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      this.user = user;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});
