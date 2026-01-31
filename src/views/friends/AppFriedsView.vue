<template>
  <section class="friends">
    <h1>Друзья</h1>
    <AppInputBasic
        class="search"
        label="Поиск"
        placeholder="Поиск"
        v-model="search"
        @update:modelValue="findUser"
    />

    <div class="search_users" v-if="search?.length > 0">
      <AppFriendCard v-for="f in search_users" :key="f.id" :friend="f" @tap="addUserFriend" is-add-friend="true" />
    </div>

    <span v-if="search?.length > 2 && search_users?.length == 0" class="no_users">Пользователей не найдено</span>

    <div class="line" v-if="search?.length > 0 && friends?.length > 0"></div>

    <div class="no_friends" v-if="friends?.length == 0">
      <img src="@/assets/images/no_friends.png" />
      <span>Добавьте друзей, чтобы выбирать фильмы вместе</span>
    </div>

    <div class="freinds_cards">
      <AppFriendCard v-for="f in friends" :key="f.id" :friend="f" :isDelete="true" @delete="deleteUser" />
    </div>
  </section>
</template>

<script>
  import { getFriends, sendFriendNotification, searchUser, deleteFriend } from '@/services/friendService';
  import AppFriendCard from '@/components/cards/AppFriendCard.vue';
  import AppInputBasic from '@/components/inputs/AppInputBasic.vue';
export default {
  components: { AppFriendCard, AppInputBasic },
  data() {
    return {
      friends: null,
      search: null,
      search_users: []
    }
  },
  async created() {
    await this.getFr();
  },
  methods: {
    async getFr() {
      const friends_response = await getFriends(localStorage.getItem('access_token'));
      if (friends_response) {
        this.friends = friends_response;
      }
    },
    async deleteUser(id) {
      const delete_user_response = await deleteFriend(id, localStorage.getItem('access_token'));
      if (delete_user_response) {
        this.getFr();
      }
    },
    async findUser() {
      if (this.search.length < 3) return;
      const find_user_response = await searchUser(this.search, localStorage.getItem('access_token'));
      if (find_user_response) {
        this.search_users = find_user_response;
      }
    },
    async addUserFriend(id) {
      console.log(id);
      const add_friend_response = await sendFriendNotification(id, localStorage.getItem('access_token'));
      if (add_friend_response) {
        alert('Запрос на добавление в друзья успешно отправлен');
      }
    }
  }
}
</script>

<style scoped>
  h1 {
    align-self: center;
  }

  .friends {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .search {
    margin-top: 30px;
  }

  .freinds_cards {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-top: 23px;
  }

  .search_users {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  .line {
    width: 100%;
    height: 1px;
    background: var(--main_text_color);
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .no_users {
    margin-top: 10px;
  }

  .no_friends {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 18px;
    width: 100%;
    height: 100%;
  }

  .no_friends img {
    width: 149px;
    height: 96px;
  }

  .no_friends span {
    font-size: var(--main_text);
    text-align: center;
  }
</style>