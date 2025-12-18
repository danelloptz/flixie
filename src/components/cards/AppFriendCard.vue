<template>
    <section class="friend_card">
        <div class="item">
            <img :src="friend.picture" class="friend_photo" />
            <h2>{{ friend.login }}</h2> 
        </div>
        <AppButtonFilled v-if="isAddFriend" @click="this.$emit('click', friend.id)">Добавить</AppButtonFilled>
    </section>
</template>

<script>
    import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
    export default {
        components: { AppButtonFilled },
        props: {
            friend: Object,
            isAddFriend: Boolean
        },
    };
</script>

<style scoped>
    .friend_card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: var( --card_bg);
        border-radius: 10px;
    }

    .item {
        display: flex;
        align-items: center;
        column-gap: 20px;
    }

    .friend_photo {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

    h2 {
        font-size: var(--film_title);
    }
</style>