<template>
  <div class="auth-container">
    <h1>Вход в Flixie</h1>

    <form @submit.prevent="login">
      <AppInputBasic
        label="Логин"
        placeholder="Введите логин"
        v-model="loginValue"
      />

      <AppInputPass
        label="Пароль"
        placeholder="Введите пароль"
        v-model="password"
      />

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <AppButtonFilled type="submit">
        Войти
      </AppButtonFilled>
      <AppButtonFilled 
        type="submit"
        @click="openGoogle"
      >
        Войти через Google
      </AppButtonFilled>
    </form>
  </div>
</template>

<script>
import AppInputBasic from "@/components/inputs/AppInputBasic.vue";
import AppInputPass from "@/components/inputs/AppInputPass.vue";
import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";
import { authGoogle } from "@/services/authService";

export default {
  name: "AppLoginView",
  components: {
    AppInputBasic,
    AppInputPass,
    AppButtonFilled,
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
    // http://localhost:8080/auth/login?state=grehthrtjui7643trr&code=4%2F0ATX87lNZ04qeLK8VEbEmAvbEsXPGPIiZJVRDgFSVEekAP6e70jRlntojamKNqk3Ts4dmEg&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent
    async handleUrlParams() {
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
      return `${this.base_url}?client_id=${this.google_client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scopes}&access_type=online&state=${this.state}`;
    },
    openGoogle() {
      const link = this.getGoogleLink();
      window.location.href = link;
      console.log(link);
    },
    login() {
      this.error = "";

      if (!this.loginValue || !this.password) {
        this.error = "Введите логин и пароль";
        return;
      }

      if (this.loginValue === "admin" && this.password === "123456") {
        this.$store.commit("setUser", { login: this.loginValue });
        this.$router.push("/");
      } else {
        this.error = "Неверный логин или пароль";
      }
    },
  },
  // async def generate_google_auth_url():
  //   state=secrets.token_urlsafe(30)
  //   await Redis.session.set(name=f"{redis_templates.google_state}{state}", value="1", ex=60*60) # Помним 1 ч.
  //   logging.info("Generate and save in Radis random state to prevent CSRF")
  //   base_url = "https://accounts.google.com/o/oauth2/v2/auth" 
  //   params = {
  //       "client_id": settings.GOOGLE_CLIENT_ID,
  //       "redirect_uri": "http://localhost:8000/auth/google/callback",
  //       "response_type": "code",
  //       "scope": "openid profile email",
  //       "access_type": "online",
  //       "state": state
  //   }
  //   auth_url = f"{base_url}?{urlencode(params)}"
  //   return auth_url
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
</style>
