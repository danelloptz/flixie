<template>
  <div>
    <h1>Friends</h1>
    <AppFriendCard v-for="f in friends" :key="f.id" :friend="f" @click="addUserFriend" />
  </div>
</template>

<script>
  import { getFriends, sendFriendNotification } from '@/services/friendService';
  import AppFriendCard from '@/components/cards/AppFriendCard.vue';
export default {
  components: { AppFriendCard },
  data() {
    return {
      friends: null
    }
  },
  async created() {
    const friends_response = await getFriends(localStorage.getItem('access_token'));
    if (friends_response) {
      this.friends = friends_response;
    }
  },
  methods: {
    async addUserFriend(id) {
      const add_friend_response = await sendFriendNotification(id, localStorage.getItem('access_token'));
      if (add_friend_response) {
        alert('Запрос на добавление в друзья успешно отправлен');
      }
    }
  }
}
</script>
