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

      <AppInputBasic
        label="Аватарка"
        type="file"
        @change="onPhotoChange"
      />

      <div v-if="photoPreview" class="photo_preview">
        <img :src="photoPreview" alt="Preview" />
      </div>

      <AppButtonFilled @click="nextStep">
        Далее
      </AppButtonFilled>
    </div>


    <div class="interests" v-if="step == 3">
      <h1>Интересы</h1>

      <div class="interests_items">
        <div
          class="interest_item"
          v-for="(item, index) in genres"
          :key="index"
          :class="{ active: isGenreSelected(item.en) }"
          @click="toggleGenre(item.en)"
        >
          <span class="checkbox">
            <span v-if="isGenreSelected(item.en)" class="checkbox_inner"></span>
          </span>

          {{ item.rus }}
        </div>
      </div>

      <AppButtonFilled @click="endSignup">
        Завершить
      </AppButtonFilled>
    </div>
    
  </div>
</template>

<script>
import AppInputBasic from "@/components/inputs/AppInputBasic.vue";
import AppInputPass from "@/components/inputs/AppInputPass.vue";
import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";
import { signupUser, signupSubmit } from "@/services/authService";

export default {
  name: "AppLoginView",
  components: {
    AppInputBasic,
    AppInputPass,
    AppButtonFilled,
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
  methods: {
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
      const signup_response = await signupUser(this.username, this.password, this.email, this.selectedGenres[0], this.photo);
      console.log(signup_response);
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
    onPhotoChange(event) {
      const file = event.target.files[0];

      if (!file) return;

      this.photo = file;
      this.photoPreview = URL.createObjectURL(file);
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

.user_data {
    display: flex;
    flex-direction: column;
}

.user_data span {
  font-size: var(--main_text);
  color: var(--unactive_text_color);
  margin-top: 7px;
}

h1 {
  font-size: 22px;
}

.interests_items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interest_item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  background: #f5f5f5;
  transition: background 0.2s;
}

.interest_item:hover {
  background: #eaeaea;
}

.interest_item.active {
  background: #e3f2fd;
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
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.photo_preview img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #1a73e8;
}

.next_btn {
  margin-top: 32px;
}
</style>
