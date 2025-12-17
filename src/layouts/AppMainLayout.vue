<template>
  <div class="main-layout">
    <!-- Верхняя шапка -->
    <header class="top-bar">
      <div></div>
      <h1 class="page-title">{{ pageTitle }}</h1>

      <img src="@/assets/images/flixie_nobg.png" class="logo" />
    </header>

    <!-- Контент -->
    <main class="content">
      <router-view />
    </main>

    <!-- Нижняя навигация -->
    <nav class="bottom_nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        @click="go(item.path)"
        :class="{ active: isActive(item.path) }"
        class="bottom_nav_item"
      >
        <img :src="item.icon" class="nav_icon" />
    </div>
    </nav>
  </div>
</template>

<script>
  import HomeIcon from "@/assets/images/home-house.png";
  import FriendsIcon from "@/assets/images/user-group-accounts.png";
  import SessionsIcon from "@/assets/images/Vector.png";
  import NotificationsIcon from "@/assets/images/notification-bell-alarm.png";
  import SettingsIcon from "@/assets/images/settings-account-more.png";
  export default {
    name: "AppMainLayout",

    computed: {
      pageTitle() {
        return this.$route.meta?.title || "Мои сессии";
      },
    },

    data() {
      return {
        navItems: [
          { path: "/", icon: HomeIcon, title: "Главная" },
          { path: "/friends", icon: FriendsIcon, title: "Друзья" },
          { path: "/sessions", icon: SessionsIcon, title: "Сессии" },
          { path: "/notifications", icon: NotificationsIcon, title: "Уведомления" },
          { path: "/settings", icon: SettingsIcon, title: "Настройки" },
        ],
      };
    },

    methods: {
      go(path) {
        if (this.$route.path !== path) {
          this.$router.push(path);
        }
      },
      isActive(path) {
        return this.$route.path === path;
      },
      goToNotifications() {
        this.$router.push("/notifications");
      },
    },
  };
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--base_bg);
}

/* ===== Header ===== */
.top-bar {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
}

h1 {
  font-size: var(--medium_title);
}

/* .page-title {
  font-size: var(--medium_title);
  font-weight: normal;
  letter-spacing: 1px;
} */

.notifications-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.logo {
  width: 24px;
  height: 24px;
}

/* ===== Content ===== */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* ===== Bottom Nav ===== */
.bottom_nav {
  background: var(--nav_bar);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 16px;
}

.bottom_nav_item {
  opacity: .8;
  cursor: pointer;
  transition: .2s;
}

.bottom_nav_item.active {
  border-bottom: 2px solid var(--primary_accent);
  opacity: 1;
}

.nav_icon {
  width: 24px;
  height: 24px;
}
</style>
