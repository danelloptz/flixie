<template>
    <section class="match">
        <div class="circle"></div>
        <h1>МЭТЧ!</h1>
        <span class="subtitle">Вы выбрали фильм вместе</span>
        <div class="film">
            <img
                :src="`http://localhost:9000/img/${match.poster_path}`"
                class="poster"
            />
            <div class="film_info">
                <span class="film_info_title">{{ match.title }}</span>
                <div class="film_info_row">
                    <span>{{ getYear(match.release_date) }} • </span>
                    <span>⭐ {{ match.vote_average.toFixed(1) }} • </span>
                    <span
                        v-for="(gen, index) in match.genres.slice(0, 1)"
                        :key="index"
                        >{{ gen.genre_name }}</span
                    >
                </div>
            </div>
        </div>
        <div class="buttons">
            <AppButtonBasic :borders="true" class="btn" @click="more"
                >Подробнее о фильме</AppButtonBasic
            >
            <AppButtonFilled class="btn" @click="close"
                >Закрыть</AppButtonFilled
            >
        </div>
        <span class="mute">Можно открыть позже в уведомлениях</span>
    </section>
</template>

<script>
    import AppButtonBasic from "@/components/buttons/AppButtonBasic.vue";
    import AppButtonFilled from "@/components/buttons/AppButtonFilled.vue";
    export default {
        props: {
            match: Object,
        },
        components: { AppButtonFilled, AppButtonBasic },
        methods: {
            getYear(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();

                return year;
            },
            close() {
                this.$emit("close");
            },
            more() {
                this.$emit("more");
            },
        },
    };
</script>

<style scoped>
    .match {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 42px;
        position: relative;
        z-index: 995;
    }

    .circle {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        position: absolute;
        z-index: 900;
        background: var(--primary_accent);
        opacity: 0.25;
        filter: blur(1rem);
        top: 0;
    }

    h1 {
        font-size: 28px;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: linear-gradient(#ffffff, #999999);
        font-weight: 600;
    }

    .subtitle {
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary_text_color);
        margin-top: 4px;
    }

    .film {
        width: 280px;
        height: 360px;
        position: relative;
        border-radius: 20px 20px 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
        overflow: hidden;
        padding-bottom: 20px;
        margin-top: 24px;
    }

    .film::after {
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

    .poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        z-index: 993;
    }

    .film_info {
        position: relative;
        z-index: 996;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .film_info_title {
        font-size: 18px;
        color: white;
        font-weight: 400;
    }

    .film_info_row {
        display: flex;
        justify-content: center;
        max-width: 180px;
        flex-wrap: wrap;
        column-gap: 3px;
    }

    .film_info_row span {
        font-size: 12px;
        color: #c5c8d4;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        width: 280px;
        margin-top: 24px;
    }

    .btn {
        width: 100%;
        height: 48px;
    }

    .mute {
        margin-top: 16px;
        color: var(--secondary_text_color);
        font-size: 11px;
        align-self: center;
        text-align: center;
    }
</style>
