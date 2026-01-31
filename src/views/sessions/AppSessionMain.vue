<template>
    <AppMatchCard
        v-if="match"
        :match="match"
        @close="closeMatch"
        @more="aboutFilm"
    />
    <section class="game" v-if="!match">
        <div class="header">
            <div></div>
            <h2>Сессия</h2>
            <div class="cross">
                <img
                    src="@/assets/images/close_red.png"
                    @click="$router.push('/')"
                />
            </div>
        </div>

        <div class="main">
            <AppMovieCard
                v-if="currentFilm"
                :film="currentFilm"
                :is_info="is_info"
                @swipe="swipe"
            />
        </div>
    </section>
</template>

<script>
import { getFilmBatch, voteFilm, getFilmById } from "@/services/sessionService";
import AppMovieCard from "@/components/cards/AppMovieCard.vue";
import AppMatchCard from "@/components/cards/AppMatchCard.vue";

export default {
    components: { AppMovieCard, AppMatchCard },
    props: {
        session_id: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            films: [],
            match: null,
            is_info: false
        };
    },

    computed: {
        currentFilm() {
            return this.films[0] || null;
        },
    },

    mounted() {
        window.addEventListener("ws-message", this.handleNotification);
    },

    beforeUnmount() {
        window.removeEventListener("ws-message", this.handleNotification);
    },

    async created() {
        await this.loadFilms();
    },

    methods: {
        async swipe(direction) {
            const film = this.currentFilm;

            await voteFilm(
                film.id,
                this.session_id,
                direction === "right" ? "disliked" : "liked",
                localStorage.getItem("access_token")
            );

            this.films.shift();

            if (this.films.length < 3) {
                await this.loadFilms();
            }
        },
        aboutFilm() {
            this.films = [];
            this.is_info = true;
            this.films.push(this.match);
            this.match = null;
        },
        closeMatch() {
            this.$router.push("/");
        },
        async handleNotification(payload) {
            switch (payload.detail.type) {
                case "match_event":
                    console.log(payload);
                    const get_film_response = await getFilmById(
                        payload.detail.data.film_id,
                        localStorage.getItem("access_token")
                    );
                    // alert(`MATCH: ${get_film_response.title}`);
                    this.match = get_film_response;
                    console.log(payload);
                    break;

                default:
                    console.warn("⚠️ Unknown notification type", payload);
            }
        },
        async loadFilms() {
            const batch = await getFilmBatch(
                this.session_id,
                localStorage.getItem("access_token")
            );
            this.films.push(...batch);
        },
    },
};
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 20px;
}

.card {
    width: 90%;
    max-width: 400px;
    height: 70vh;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    position: relative;
    transition: transform 0.2s ease;
    border-radius: 20px;
}

.overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    color: white;
}

h1 {
    margin: 0;
    font-size: var(--film_title);
}

h3 {
    margin: 5px 0;
    opacity: 0.8;
    font-size: var(--main_text);
}

p {
    font-size: 14px;
    opacity: 0.9;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.cross {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 14px;
    background: var(--nav_bar);
}
.cross img {
    width: 40px;
    height: 40px;
}
</style>
