<template>
    <section class="panel">
        <div class="left">
            <img :src="user.picture" class="avatar" />
            <div class="block">
                <h2>{{ user.login }}</h2>
                <span>Хочет добавить вас в друзья</span>
            </div>
        </div>
        <div class="icons">
            <img src="@/assets/images/Check.png" class="check" @click="submit" />
            <img src="@/assets/images/close_red.png" class="close" @click="cancel" />
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            user: Object
        },
        methods: {
            submit() {
                this.$emit('submit');
            },
            cancel() {
                this.$emit('cancel');
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
</style>