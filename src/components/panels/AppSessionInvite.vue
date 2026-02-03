<template>
    <section class="panel">
        <div class="left">
            <img :src="user.picture" class="avatar" />
            <div class="block">
                <h2>{{ user.login }} пригласил вас в сессию</h2>
                <span>{{ session.session_name }}</span>
            </div>
        </div>
        <AppButtonFilled class="btn" @click="submit">Войти</AppButtonFilled>
    </section>
</template>

<script>
    import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
    export default {
        components: { AppButtonFilled },
        props: {
            session: Object, 
            user: Object
        },
        methods: {
            submit() {
                this.$emit('submit');
            }
        }
    };
</script>

<style scoped>
    .panel {
        width: 100%;
        padding: 12px 16px;
        background: var(--card_bg);
        border-radius: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .left {
        display: flex;
        column-gap: 13px;
        align-items: center;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .block {
        display: flex;
        flex-direction: column;
        row-gap: 6px;
    }

    .block h2 {
        font-size: 15px;
        color: var(--main_text);
        font-weight: normal;
    }

    .block span {
        font-size: 13px;
        color: var(--secondary_text_color);
    }

    .btn {
        width: 60px;
        height: 23px;
        font-size: 12px;
        align-self: flex-end;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>