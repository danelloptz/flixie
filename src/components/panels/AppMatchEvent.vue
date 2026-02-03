<template>
    <section class="panel" @click="submit">
        <div class="left">
            <span class="icon">🎬</span>
            <div class="block">
                <h2>Фильм выбран в сессии</h2>
                <span class="mute">Сессия: {{ session.session_name }}</span>
                <span class="violet">Нажмите, чтобы посмотреть результат</span>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            session: Object, 
        },
        methods: {
            submit() {
                this.$emit('open_match');
            },
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

    .icons {
        display: flex;
        align-items: center;
    }

    .check {
        width: 36px;
        height: 36px;
    }

    .close {
        width: 24px;
        height: 24px;
    }

    .icon {
        font-size: 40px;
    }

    .mute {
        color: var(--secondary_text_color);
        font-size: 13px;
    }

    .violet {
        color: var(--primary_accent) !important;
        font-size: 12px;
    }
</style>