<template>
  <section class="notifications">
  <h1>Уведомления</h1>

  <div class="no_notifications" v-if="!notifications.length">
    <img src="@/assets/images/no_notifications.png" />
    <span>Уведомлений нет</span>
  </div>

  <div class="wrapper" v-else>
    <div
      class="type-block"
      v-for="(items, type) in groupedNotifications"
      :key="type"
    >
      <h2>{{ getNotificationType(type) }}</h2>

      <!-- TODO плашки: 
        -  заявка в друзья
        - приглашение в сессию
        - мэтч в сессии
        - системное уведомление 
      -->
      <div
        class="item"
        v-for="item in items"
        :key="item.id"
      >
        <span>
          От пользователя #{{ item.sender_id }}
        </span>

        <AppButtonFilled
          v-if="type === 'friend_request'"
          @click="approveFriendRequest(item.sender_id)"
        >
          Принять
        </AppButtonFilled>

        <AppButtonFilled
          v-if="type === 'session_invite'"
          @click="approveSessionRequest(item.data.session_id)"
        >
          Принять
        </AppButtonFilled>
      </div>
    </div>
  </div>
</section>

</template>

<script>
  import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
import { getNotifications } from '@/services/notificationService';
  import { approveRequest } from '@/services/friendService';
  import { aprooveJoin } from '@/services/sessionService';
export default {
  name: "AppNotificationsView",
  components: { AppButtonFilled },
  data() {
    return {
      notifications: []
    }
  },
  async created() {
    const notification_response = await getNotifications(
      localStorage.getItem('access_token')
    );
    if (notification_response) {
      this.notifications = notification_response;
    }
  },
  computed: {
    groupedNotifications() {
      return this.notifications.reduce((acc, notification) => {
        if (!acc[notification.type]) {
          acc[notification.type] = [];
        }
        acc[notification.type].push(notification);
        return acc;
      }, {});
    }
  },
  methods: {
    async approveSessionRequest(id) {
      const join_response = await aprooveJoin(
        +id,
        localStorage.getItem('access_token')
      );
      console.log(join_response);
    },
    async approveFriendRequest(id) {
      const approve_request_response = await approveRequest(
        id,
        localStorage.getItem('access_token')
      );
      console.log(approve_request_response);
    },
    getNotificationType(type) {
      switch (type) {
        case "friend_request":
          return "Запросы в друзья";
        case "session_invite":
          return "Приглашения в сессию";
        case "match_event":
          return "События матча";
        default:
          return "Неизвестные уведомления";
      }
    }
  }
};

</script>

<style scoped>
  h1 {
    font-size: 24px;
    font-weight: normal;
    color: var(--main_text);
    align-self: center;
    margin-top: 10px;
    margin-bottom: 26px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  .item {
    display: grid;
    grid-template-columns: 5fr 1fr;
    gap: 15px;
    align-items: center;
  }
  h2 {
    font-weight: normal;
    font-size: 14px;
    color: var(--secondary_text_color);
  }
  
  .notifications  {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .no_notifications {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    align-items: center;
  }

  .no_notifications img {
    width: 150px;
    height: 89px;
  }

  .no_notifications span {
    font-size: var(--main_text);
    text-align: center;
  }

  .type-block {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>