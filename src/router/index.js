import { createRouter, createWebHistory } from "vue-router";

import AppAuthLayout from "@/layouts/AppAuthLayout.vue";
import AppMainLayout from "@/layouts/AppMainLayout.vue";

import Login from "@/views/auth/AppLoginView.vue";
import Register from "@/views/auth/AppRegisterView.vue";
import Home from "@/views/home/AppHomeView.vue";
import Friends from "@/views/friends/AppFriedsView.vue";
import Notifications from "@/views/notifications/AppNotificationsView.vue";
import Settings from "@/views/settings/AppSettingsView.vue";
import AppStart from "@/views/auth/AppStart.vue";
import SessionCreate from "@/views/sessions/AppSessionCreateView.vue";
import SessionMain from "@/views/sessions/AppSessionMain.vue";

const routes = [
  {
    path: "/auth",
    children: [
      { path: "", component: AppStart },
      { path: "login", component: Login },
      { path: "signup", component: Register },
    ],
  },
  {
    path: "/",
    component: AppMainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Home },
      { path: "friends", component: Friends, meta: { title: "Друзья" }, },
      { 
        path: "sessions", 
        component: SessionCreate, 
        meta: { 
          title: "Создание сессии" 
        }, 
        children: [
          { 
            path: "play", 
            component: SessionMain,
            meta: { 
              title: "Сессия" 
            }, 
          },
        ]
      },
      { path: "notifications", component: Notifications, meta: { title: "Уведомления" }, },
      { path: "settings", component: Settings, meta: { title: "Настройки" }, },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { useAuthStore } from "@/store/auth";

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuth) {
    next("/auth");
  } else {
    next();
  }
});
