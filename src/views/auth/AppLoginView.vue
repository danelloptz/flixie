<template>
  <div class="auth-container">
    <h1>Вход</h1>

      <div class="input_group">
        <AppInputBasic
          placeholder="Введите логин"
          v-model="loginValue"
        />

        <AppInputPass
          placeholder="Введите пароль"
          v-model="password"
        />
      </div>

      <AppButtonFilled
        @click="login"
      >
        Войти
      </AppButtonFilled>

      <div class="line_wrapper">
        <div class="line"></div>
        <span>или</span>
        <div class="line"></div>
      </div>

      <AppButtonFilled 
        @click="openGoogle"
        class="google_btn"
      >
        Войти через Google
      </AppButtonFilled>
      <AppButtonBasic 
        @click="openSignup"
      >
        Нет аккаунта? Зарегистрироваться
      </AppButtonBasic>
  </div>
</template>

<script>
import AppInputBasic from "@/components/inputs/AppInputBasic.vue";
import AppInputPass from "@/components/inputs/AppInputPass.vue";
import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";
import { authGoogle, loginUser } from "@/services/authService";
import AppButtonBasic from "@/components/buttons/AppButtonBasic.vue";
import { useAuthStore } from "@/store/auth";

export default {
  name: "AppLoginView",
  components: {
    AppInputBasic,
    AppInputPass,
    AppButtonFilled,
    AppButtonBasic
  },
  data() {
    return {
      loginValue: "",
      password: "",
      error: "",
      state: "grehthrtjui7643trr",
      google_client_id: "28060462209-8os8kkt6tp2008a5mretfr0fmugu6ri4.apps.googleusercontent.com",
      redirect_uri: "http://localhost:8080/auth/login",
      scopes: "openid+profile+email",
      base_url: 'https://accounts.google.com/o/oauth2/v2/auth'
    };
  },
  async mounted() {
    await this.handleUrlParams();
  },
  methods: {
    async login() {
      const login_response = await loginUser(this.loginValue, this.password);
      if (login_response?.access_token) {
        const authStore = useAuthStore();

        authStore.login({
          access_token: login_response.access_token,
          refresh_token: login_response.refresh_token,
        });

        this.$router.push("/");
      }
    },
    openSignup() {
      this.$router.push('/auth/signup');
    },
    async handleUrlParams() {
      /*
        Функция для считывания параметров, которые отдаёт Google OAuth, и последующего обмена на токены.
      */
      const params = new URLSearchParams(window.location.search);

      // параметры, которые отдаёт гугл (сравниваем state и засылаем code на бэк)
      const code = params.get("code") || null;
      const error = params.get("error") || null;
      const state = params.get("state") || null;

      console.log(code, error, state);

      if (code) {
        const google_response = await authGoogle(code);
        console.log(google_response);
      }
    },
    getGoogleLink() {
      // возвращаем ссылку для Google OAuth
      return `${this.base_url}?client_id=${this.google_client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scopes}&access_type=online&state=${this.state}`;
    },
    openGoogle() {
      const link = this.getGoogleLink();
      window.location.href = link;
      console.log(link);
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  padding: 80px 20px 0px 20px;
  flex-direction: column;
}

.input_group {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 23px;
  margin-bottom: 32px;
}

.line_wrapper {
  margin-top: 18px;
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.line {
  width: 160px;
  height: 1px;
  background: var(--unactive_text_color);
}

.line_wrapper span {
  color: var(--unactive_text_color);
  font-size: var(--main_text);
}

.google_btn {
  background: var(--card_bg); 
  border: 1px solid var(--primary_accent); 
  margin-top: 18px;
}

.error {
  color: #d93025;
  margin-bottom: 12px;
  text-align: center;
}


</style>
