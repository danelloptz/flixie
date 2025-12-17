<template>
  <div class="auth-container">
    <div class="user_data" v-if="step == 1">
        <h1>Регистрация</h1>
        <span>Создайте аккаунт, чтобы начать</span>

        <div class="input_group">
          <AppInputBasic
              placeholder="Логин"
              v-model="username"
          />
          <AppInputBasic
              placeholder="Почта"
              type="email"
              v-model="email"
          />
        </div>
        
        <div class="input_group">
          <AppInputPass
              placeholder="Пароль"
              v-model="password"
          />
          <AppInputPass
              placeholder="Повторите пароль"
              v-model="password_check"
          />
        </div>
        
        <AppButtonFilled 
            class="next_btn"
            @click="nextStep"
        >
            Далее
        </AppButtonFilled>
    </div>

    <div class="profile_photo" v-if="step == 2">
      <h1>Фото профиля</h1>
      <span class="create_acc_text">Выберите изображение для профиля</span>

      <div class="photo_preview" @click="initiateInputClick">
        <img v-if="photoPreview" :src="photoPreview" alt="Preview" class="avatar" />
        <img src="@/assets/images/video-camera.png" class="photo_preview_sample" v-if="!photoPreview" />
      </div>

      <span class="upload_text" @click="initiateInputClick">Загрузить фото</span>

      <AppInputBasic
        ref="photo_input"
        style="display: none;"
        label="Аватарка"
        type="file"
        @change="onPhotoChange"
      />

      <div class="tight_input_group">
        <AppButtonFilled @click="nextStep">
          Далее
        </AppButtonFilled>
        <AppButtonBasic>
          Пропустить
        </AppButtonBasic>
      </div>
    </div>


    <div class="interests" v-if="step == 3">
      <h1>Любимые жанры</h1>
      <span class="create_acc_text">Выберите несколько жанров</span>

      <div class="interests_items">
        <div
          class="interest_item"
          v-for="(item, index) in genres"
          :key="index"
          :class="{ active: isGenreSelected(item.en) }"
          @click="toggleGenre(item.en)"
        >
          {{ item.rus }}
        </div>
      </div>

      <AppButtonFilled class="end_btn" @click="endSignup">
        Завершить
      </AppButtonFilled>
    </div>
    
  </div>
</template>

<script>
import AppInputBasic from "@/components/inputs/AppInputBasic.vue";
import AppInputPass from "@/components/inputs/AppInputPass.vue";
import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";
import AppButtonBasic from "@/components/buttons/AppButtonBasic.vue";
import { signupUser, signupSubmit, loadImage } from "@/services/authService";
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
      step: 1,
      username: null,
      email: null,
      password: null,
      password_check: null,
      photo: null,
      photoPreview: null,
      genres: [
        {
          en: "Adventure",
          rus: "Приключения"
        },
        {
          en: "Fantasy",
          rus: "Фантастика"
        },
        {
          en: "Animation",
          rus: "Мультфильмы"
        },
        {
          en: "Drama",
          rus: "Драма"
        },
        {
          en: "Horror",
          rus: "Ужасы"
        },
        {
          en: "Action",
          rus: "Боевик"
        },
        {
          en: "Comedy",
          rus: "Комедия"
        },
        {
          en: "History",
          rus: "Исторический"
        },
        {
          en: "Western",
          rus: "Вестерн"
        },
        {
          en: "Thriller",
          rus: "Триллер"
        },
        {
          en: "Crime",
          rus: "Криминальный"
        },
        {
          en: "Documentary",
          rus: "Документальный"
        },
        {
          en: "Science Fiction",
          rus: "Научная фантастика"
        },
        {
          en: "Mystery",
          rus: "Мистика"
        },
        {
          en: "Music",
          rus: "Музыкальный"
        },
        {
          en: "Romance",
          rus: "Романтика"
        },
        {
          en: "Family",
          rus: "Семейный"
        },
        {
          en: "War",
          rus: "Военный"
        },
        {
          en: "TV Movie",
          rus: "ТВ фильмы"
        },
      ],
      selectedGenres: [],
    };
  },
  async mounted() {
    await this.handleUrlParams();
  },
  methods: {
    initiateInputClick() {
      this.$refs.photo_input.trigger();
    },
    async handleUrlParams() {
      /*
        Функция для считывания параметра token, который берется из письма с подтверждением.
        Пользователь подтверждает свою почту.
      */
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token") || null;

      if (token) {
        const server_response = await signupSubmit(token);
        console.log(server_response);
      }
    },
    async endSignup() {
      const signup_response = await signupUser(this.username, this.password, this.email, this.selectedGenres, this.photoPreview);
      if (signup_response?.access_token) {
        const authStore = useAuthStore();

        authStore.login({
          access_token: signup_response.access_token,
          refresh_token: signup_response.refresh_token,
        });

        this.$router.push("/");
      }
    },
    nextStep() {
      this.step++;
    },
    toggleGenre(genreEn) {
      const index = this.selectedGenres.indexOf(genreEn);

      if (index === -1) {
        this.selectedGenres.push(genreEn);
      } else {
        this.selectedGenres.splice(index, 1);
      }
    },
    async onPhotoChange(event) {
      const file = event.target.files[0];

      if (!file) return;

      this.photo = file;

      const load_image_url = await loadImage(this.photo);
      if (load_image_url) {
        this.photoPreview = load_image_url;
      }

    },

    isGenreSelected(genreEn) {
      return this.selectedGenres.includes(genreEn);
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
  margin-top: 32px;
}

.error {
  color: #d93025;
  margin-bottom: 12px;
  text-align: center;
}

.user_data, .profile_photo, .interests {
    display: flex;
    flex-direction: column;
}

.user_data span, .profile_photo span, .interests span {
  font-size: var(--main_text);
  color: var(--unactive_text_color);
  margin-top: 7px;
}

h1 {
  font-size: 22px;
}

.interests_items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 29px;
}

.interest_item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 18px;
  cursor: pointer;
  background: var(--divider);
  transition: background 0.2s;
  color: var(--main_text_color);
  font-size: var(--main_text);
  padding: 10px 30px;
}

.interest_item:hover {
  background: #eaeaea;
}

.interest_item.active {
  background: var(--primary_accent);
}

.checkbox {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox_inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1a73e8;
}
.photo_preview {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  align-self: center;
  background: var(--card_bg);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.photo_preview_sample {
  width: 65px;
  height: 65px;
  border-radius: 50%;

}

.next_btn {
  margin-top: 32px;
}

.upload_text {
  color: var(--main_text_color);
  margin-top: 12px;
  align-self: center;
  letter-spacing: .3px;
}

.tight_input_group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 48px;
}

.create_acc_text {
  color: var(--unactive_text_color);
  font-size: var(--main_text);
}

.end_btn {
  margin-top: 32px;
}
</style>
