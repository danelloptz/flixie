import { createRouter, createWebHistory } from "vue-router";

import AppAuthLayout from "@/layouts/AppAuthLayout.vue";
import AppMainLayout from "@/layouts/AppMainLayout.vue";

import Login from "@/views/auth/AppLoginView.vue";
import Register from "@/views/auth/AppRegisterView.vue";
import Home from "@/views/home/AppHomeView.vue";
import Friends from "@/views/friends/AppFriedsView.vue";
import Sessions from "@/views/sessions/AppSessionsListView.vue";
import Notifications from "@/views/notifications/AppNotificationsView.vue";
import Settings from "@/views/settings/AppSettingsView.vue";

const routes = [
  {
    path: "/auth",
    component: AppAuthLayout,
    children: [
      { path: "login", component: Login },
      { path: "register", component: Register },
    ],
  },
  {
    path: "/",
    component: AppMainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Home },
      { path: "friends", component: Friends },
      { path: "sessions", component: Sessions },
      { path: "notifications", component: Notifications },
      { path: "settings", component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import store from "@/store";

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next("/auth/login");
  } else {
    next();
  }
});
