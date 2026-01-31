<template>
  <div>
    <h1>Настройки</h1>
    <p>Заглушка страницы настроек</p>
    <AppButtonFilled @click="exit">Выйти с аккаунта</AppButtonFilled>
  </div>
</template>

<script>
  import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
export default {
  name: "AppSettingsView",
  components: { AppButtonFilled },
  methods: {
    exit() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>