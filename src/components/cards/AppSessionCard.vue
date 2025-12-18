<template>
    <section class="session_card">
        <h2>{{ friend.name }}</h2> 
        <div class="participants_wrapper">
            <img 
                class="participant"
                v-for="(item, index) in participants"
                :key="index"
                :src="item.picture"

            />
        </div>
        <span>Админ: {{ session.owner_login }}</span>
        <span class="green">Количество участников: {{ session.members_count }}</span>
    </section>
</template>

<script>
    export default {
        props: {
            session: Object,
            isAddFriend: Boolean
        },
        data() {
            return {
                participants: null
            }
        },
        methods: {

        }
    };
</script>

<style scoped>
    .session_card {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        background: var( --card_bg);
        border-radius: 14px;
    }

    h2 {
        font-size: var(--film_title);
    }

    .participants_wrapper {
        margin-top: 30px;
        margin-bottom: 16px;
        display: flex;
        column-gap: 8px;
        align-items: center;
    }

    .participant {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
    }

    .session_card span {
        font-size: var(--sub_text);
        color: var(--unactive_text_color);
    }

    .green {
        color: var(--like) !important;
        margin-top: 5px;
    }
</style>