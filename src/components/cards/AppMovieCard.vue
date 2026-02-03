<template>
    <div
        v-if="film && !more"
        class="card"
        :style="cardStyle"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
    >
        <div class="overlay">
            <h1>{{ film.title }}</h1>
            <h3>
                {{ getYear(film.release_date) }} • ⭐
                {{ film.vote_average.toFixed(1) }}
            </h3>
            <span
                class="mute"
                v-for="(gen, index) in film.genres"
                :key="index"
                >{{ " " + gen.genre_name + "," }}</span
            >
        </div>
    </div>

    <div v-if="film && more" class="more">
        <div class="banner-wrap">
            <img
                :src="`http://localhost:9000/img/${film.backdrop_path}`"
                class="banner"
            />
        </div>
        <div class="header">
            <img
                :src="`http://localhost:9000/img/${film.poster_path}`"
                class="poster"
            />
            <div class="header_text">
                <h2>{{ film.title }}</h2>
                <span class="mute">{{ film.original_title }}</span>
                <h3>
                    {{ getYear(film.release_date) }} •
                    {{ film.original_language.toUpperCase() }} • ⭐
                    {{ film.vote_average.toFixed(1) }}
                </h3>
                <div>
                   <span
                        class="mute"
                        v-for="(gen, index) in film.genres"
                        :key="index"
                        >{{ " " + gen.genre_name + "," }}</span
                    >
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="descr">
            <span class="descr_title">Описание:</span>
            <span class="descr_text">{{ film.overview }}</span>
        </div>
        <AppButtonBasic class="btn" :borders="true" @click="get_back">{{ is_info ? 'Закрыть' : 'Вернуться к выбору' }}</AppButtonBasic
        >
    </div>
</template>

<script>
  import AppButtonBasic from "@/components/buttons/AppButtonBasic.vue";
  export default {
      name: "AppMovieCard",
      components: { AppButtonBasic },
      props: {
          film: {
              type: Object,
              required: true,
          },
          is_info: Boolean
      },

      emits: ["swipe"],

      data() {
          return {
              startX: 0,
              startY: 0,
              deltaX: 0,
              deltaY: 0,
              isDragging: false,
              more: false,
          };
      },

      watch: {
        is_info(val) {
            console.log(val);
            this.more = val;
        }
      },

      computed: {
        posterUrl() {
            return `http://localhost:9000/img/${this.film.poster_path}`;
        },
        cardStyle() {
            const rotate = this.deltaX / 20; // наклон
            return {
                backgroundImage: `url(${this.posterUrl})`,
                transform: `translate(${this.deltaX}px, ${this.deltaY}px) rotate(${rotate}deg)`,
                transition: this.isDragging ? "none" : "transform 0.3s ease-out",
            };
        }
      },

      created() {
        this.more = this.is_info;
      },

      methods: {
        resetCard() {
            this.deltaX = 0;
            this.deltaY = 0;
        },
        get_back() {
            if (this.is_info) {
                this.$emit('close');
                return;
            }
            this.more = false;
        },
          getYear(dateString) {
              const date = new Date(dateString);
              const year = date.getFullYear();

              return year;
          },

         startDrag(e) {
            this.isDragging = true;

            const point = e.touches ? e.touches[0] : e;

            this.startX = point.clientX;
            this.startY = point.clientY;
            this.deltaX = 0;
            this.deltaY = 0;
        },


          onDrag(e) {
              if (!this.isDragging) return;

              const point = e.touches ? e.touches[0] : e;

              this.deltaX = point.clientX - this.startX;
              this.deltaY = point.clientY - this.startY;
          },

          endDrag() {
                if (!this.isDragging) return;
                this.isDragging = false;

                const absX = Math.abs(this.deltaX);
                const absY = Math.abs(this.deltaY);

                // свайп вверх — показать more
                if (this.deltaY < -120 && absY > absX) {
                    this.more = true;
                    this.resetCard();
                    return;
                }

                // горизонтальный свайп
                if (absX > 100 && absX > absY) {
                    this.deltaX = this.deltaX > 0 ? 1000 : -1000; // улёт
                    this.deltaY = 0;

                    setTimeout(() => {
                        this.$emit("swipe", this.deltaX > 0 ? "right" : "left");
                        this.resetCard();
                    }, 300);

                    return;
                }

                // если не засчитан — вернуть назад
                this.resetCard();
            },
      },
  };
</script>

<style scoped>
  .card {
      width: 90%;
      max-width: 400px;
      height: 70vh;
      background-size: cover;
      background-position: center;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      will-change: transform;
        touch-action: none;
  }

  .card::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60%;
      z-index: 994;
      background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.9),
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0)
      );
  }

  .overlay {
      width: 100%;
      padding: 20px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
      color: white;
      position: relative;
      z-index: 999;
  }

  h1 {
      font-size: 20px;
      font-weight: normal;
  }

  h3 {
      font-size: 14px;
      margin-top: 5px;
  }

  .mute {
      color: var(--secondary_text_color);
      font-size: 12px;
      margin-top: 5px;
  }

  .more {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 122px 16px 16px 16px;
    position: relative;
  }

  .banner-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      z-index: 900;
  }


  .banner {
      width: 100%;
      display: block;
  }


  .banner-wrap::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 75%;
      z-index: 901;
      background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.95),
          rgba(0, 0, 0, 0.85),
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0)
      );
      pointer-events: none;
  }


  .header {
    display: flex;
    column-gap: 15px;
    width: 100%;
    z-index: 999;
  }

  .poster {
    width: 120px;
  }

  .header_text {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin-bottom: 4px;
  }

  .line {
    margin-top: 24px;
    width: 100%;
    height: 1px;
    background: white;
    margin-bottom: 16px;
  }

  .descr {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 5px;
  }

  .descr_title {
    font-size: 16px;
    color: var(--main_text_color);
  }

  .descr_text {
    font-size: 14px;
    color: #C5C8D4;
  }

  .btn {
    width: 100%;
    height: 52px;
    margin-top: 21px;
  }
</style>
