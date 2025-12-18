<template>
  <div>
    <h1>Уведомления</h1>
    <p>Заглушка окна уведомлений</p>

    <div class="notifications_wrapper">
      <div 
        class="item"
        v-for="(item, index) in notifications"
        :key="index"
      >
        <h2>{{ getNotificationType(item.type) }}</h2>
        <AppButtonFilled v-if="getNotificationType(item.type) == 'Запрос в друзья'" @click="approveFriendRequest(item.sender_id)">Принять</AppButtonFilled>
      </div>
    </div>
  </div>
</template>

<script>
  import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
import { getNotifications } from '@/services/notificationService';
  import { approveRequest } from '@/services/friendService';
export default {
  name: "AppNotificationsView",
  data() {
    return {
      notifications: null
    }
  },
  async created() {
    const notification_response = await getNotifications(localStorage.getItem('access_token'));
    if (notification_response) {
      this.notifications = notification_response;
    }
  },
  methods: {
    async approveFriendRequest(id) {
      const approve_request_response = await approveRequest(id, localStorage.getItem('access_token'));
      console.log(approve_request_response);
    },
    getNotificationType(type) {
      switch (type) {
        case "friend_request":
          return 'Запрос в друзья';
        case "session_invite":
          return 'Приглашенеи в сессию';
        case 'match_event':
          return 'Событие мэтча';
        default:
          return 'Неизвестное уведомление' ;
      }
    }
  }
};
</script>