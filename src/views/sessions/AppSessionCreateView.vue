<template>
    <section class="wrapper" v-if="activeIndex == 1">
        <div class="header">
            <div class="close">
                <img src="@/assets/images/close_red.png" class="close_cross" />
            </div>
            <div class="title_block">
                <h2>Создание сессии</h2>
            </div>
        </div>

        <div class="settings">
            <span class="settings_text">Название сессии</span>
            <AppInputBasic class="input" :placeholder="'Название'" v-model="session_name" />

            <div class="friends">
                <span class="settings_text">Пригласить друзей</span>
                <div class="friends_list">
                    <div 
                        class="friend_item"
                        v-for="(item, index) in friends"
                        :key="index"
                        @click="sendJoin(item.id)"
                    >
                        <img :src="item.picture" class="friend_item_image" :class="{ active_friend: selected_friends.indexOf(item.id) != -1 }" />
                        <span>{{ item.login }}</span>
                    </div>
                </div>
            </div>

            <!-- <span class="settings_text">Годы выпуска</span>
            <div class="row">
                <AppInputBasic class="input"  :placeholder="'от'" v-model="session_start" />
                <AppInputBasic class="input"  :placeholder="'до'" v-model="session_end" />
            </div>

            <span class="settings_text">Страна производства</span>
            <AppInputBasic class="input m-b"  :placeholder="'Страна'" v-model="session_country" /> -->

            <AppButtonFilled class="create_session_btn" @click="createNewSession">Создать сессию</AppButtonFilled>
        </div>
    </section>
    <!-- <section class="wrapper" v-if="activeIndex == 2">
        <div class="header">
            <div class="close">
                <img src="@/assets/images/close.png" class="close_cross" />
            </div>
            <div class="title_block">
                <h2>Создание сессии</h2>
            </div>
        </div>

        <div class="friends">
            <span class="settings_text">Пригласить друзей</span>
            <div class="friends_list">
                <div 
                    class="friend_item"
                    v-for="(item, index) in friends"
                    :key="index"
                    @click="sendJoin(item.id)"
                >
                    <img :src="item.picture" class="friend_item_image" />
                    <span>{{ item.login }}</span>
                </div>
            </div>
        </div>

        <AppButtonBasic>Добавить друзей</AppButtonBasic>
        <AppButtonFilled @click="openSession(session_info.id)">Создать сессию</AppButtonFilled>
    </section> -->
</template> 

<script>
    import AppInputBasic from '@/components/inputs/AppInputBasic.vue';
    import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
    import AppButtonBasic from '@/components/buttons/AppButtonBasic.vue';
    import { getFriends } from '@/services/friendService';
    import { createSession, sendInviteSession } from '@/services/sessionService';
    export default {
        components: { AppInputBasic, AppButtonFilled, AppButtonBasic },
        data() {
            return {
                session_name: null,
                session_start: null,
                session_end: null,
                session_country: null,
                activeIndex: 1,
                friends: null,
                session_info: null,
                selected_friends: [],
            }
        },
        async created() {
            const friends_response = await getFriends(localStorage.getItem('access_token'));
            this.friends = friends_response;
        },
        methods: {
            sendJoin(id) {
                this.selected_friends.push(id);
            },
            next() {
                this.activeIndex++;
            },
            async createNewSession() {
                const create_session_response = await createSession(this.session_name, localStorage.getItem('access_token'));
                this.session_info = create_session_response;
                
                if (this.selected_friends.length > 0) {
                    this.selected_friends.forEach(async id => {
                        await sendInviteSession(this.session_info.id, id, localStorage.getItem('access_token'));
                    });
                }
                this.openSession(this.session_info.id);
            },
            openSession(session_id) {
                this.$router.push(`/sessions/play/${session_id}`);
            },
        }
    };
</script>

<style scoped>
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .header {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 4fr;
        column-gap: 6px;
    }

    .close, .title_block {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 14px;
        background: var(--nav_bar);
        width: 100%;
    }

    .close_cross {
        width: 20px;
        height: 20px;
    }

    .title_block h2 {
        font-size: var(--film_title);
        font-weight: normal;
        letter-spacing: .6px;
    }

    .settings, .friends {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        border-radius: 14px;
        background: var(--nav_bar);
        width: 100%;
        padding: 8px;
    }

    .settings_text {
        font-size: var(--main_text);
        color: var(--unactive_text_color);
        margin-top: 8px;
    }

    .input {
        margin-top: 8px;
    }

    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
    }

    .friends_list {
        width: 100%;
        max-height: 330px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 15px;
        row-gap: 8px;
        margin-top: 12px;
        background: var(--card_bg);
        padding: 20px 16px;
        border-radius: 14px;
    }

    .friend_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
    }

    .friend_item_image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        outline: 7px solid var(--card_bg);
    }

    .friend_item span {
        font-size: var(--main_text);
        color: var(--unactive_text_color);
    }

    .m-b {
        margin-bottom: 24px;
    }

    .active_friend {
        outline: 7px solid var(--like);;
    }

    .create_session_btn {
        margin-top: 23px;
    }
</style>