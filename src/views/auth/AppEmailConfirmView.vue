<template>
  <div class="auth-container">
    <div class="user_data" v-if="page == 1">
        <h1>Регистрация</h1>

        <AppInputBasic
            label="Юзернейм"
            placeholder="Введите юзернейм (английскими буквами)"
            v-model="username"
        />
        <AppInputBasic
            label="Почта"
            placeholder="Введите почту"
            type="email"
            v-model="email"
        />

        <AppInputPass
            label="Пароль"
            placeholder="Придумайте пароль"
            v-model="password"
        />
        <AppInputPass
            label="Пароль проверка"
            placeholder="Повторите пароль"
            v-model="password_check"
        />
        
        <AppButtonFilled 
            @click="openSignup"
        >
            Далее
        </AppButtonFilled>
    </div>

    <div class="profile_photo" v-if="page == 2">
        <h1>Фото профиля</h1>
    </div>

    <div class="interests" v-if="page == 2">
        <h1>Интересы</h1>
    </div>
    
  </div>
</template>

<script>
import AppInputBasic from "@/components/inputs/AppInputBasic.vue";
import AppInputPass from "@/components/inputs/AppInputPass.vue";
import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";

export default {
  name: "AppLoginView",
  components: {
    AppInputBasic,
    AppInputPass,
    AppButtonFilled,
  },
  data() {
    return {
      page: 1,
      username: null,
      email: null,
      password: null,
      password_check: null
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 360px;
  margin: 80px auto;
  padding: 24px;
  border-radius: 8px;
  background: #ffffff;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.error {
  color: #d93025;
  margin-bottom: 12px;
  text-align: center;
}

.user_data {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
