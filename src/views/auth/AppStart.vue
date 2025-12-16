<template>
    <section class="start_wrapper">
        <div class="help"></div>
        <div class="center_info">
            <img src="@/assets/images/flixie_nobg.png" class="logo" />
            <h1>Flixie</h1>
            <span>Выбирайте фильмы вместе</span>
        </div>

        <div class="btns_wrapper">
            <AppButtonFilled @click="signin">Войти</AppButtonFilled>
            <AppButtonBasic @click="signup">Создать аккаунт</AppButtonBasic>
        </div>
    </section>
</template> 

<script>
import AppButtonBasic from '@/components/buttons/AppButtonBasic.vue';
import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';

export default {
    components: { AppButtonBasic, AppButtonFilled },
    methods: {
        signin() {
            this.$router.push('/auth/login');
        },
        signup() {
            this.$router.push('/auth/signup');
        }
    }
};

</script>

<style scoped>
    .start_wrapper {
        background: var(--base_bg);
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10vh;
    } 

    .center_info {
        justify-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 16px;
    }

    .center_info img {
        width: 96px;
        height: 96px;
    }

    .center_info span {
        font-size: var(--main_text);
        color: var(--unactive_text_color);
    }

    .btns_wrapper {
        display: flex;
        flex-direction: column;
        justify-self: end;
        padding: 0px 20px;
        width: 100%;
    }
</style>