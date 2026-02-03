<template>
  <section class="modals" v-if="match || card">
    <AppMatchCard 
      v-if="match"
      :match="match"
      @close="close_match"
      @more="about_match"
    />
    <AppMovieCard 
      v-if="card"
      :film="card"
      :is_info="true"
      @close="close_movie"
    />
  </section>
  <section class="notifications" v-if="!match && !card">
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

      <div 
        v-if="type == 'session_invite'"
        class="col"
      >
        <div
          v-for="item in items"
          :key="item.id"
        >
          <AppSessionInvite 
            :session="item.data"
            :user="test_user"
            @submit="approveSessionRequest(item.data.session_id)"
          />
        </div>
      </div>

      <div 
        v-if="type == 'friend_request'"
        class="col"
      >
        <div
          v-for="item in items"
          :key="item.id"
        >
          <AppFriendRequest 
            :user="test_user"
            @submit="approveFriendRequest(item.sender_id)"
          />
        </div>
      </div>

      <div 
        v-if="type == 'match_event'"
        class="col"
      >
        <div
          v-for="item in items"
          :key="item.id"
        >
          <AppMatchEvent 
            :session="item.data"
            @open_match="openMatch(item.data.film_id)"
          />
        </div>
      </div>

      <!-- TODO плашки: 
        - заявка в друзья
        - приглашение в сессию
        - мэтч в сессии
        - системное уведомление 
      -->
    </div>
  </div>
</section>

</template>

<script>
  import AppButtonFilled from '@/components/buttons/AppButtonFilled.vue';
  import AppSessionInvite from '@/components/panels/AppSessionInvite.vue';
  import AppFriendRequest from '@/components/panels/AppFriendRequest.vue';
  import AppMatchEvent from '@/components/panels/AppMatchEvent.vue';
  import AppMatchCard from '@/components/cards/AppMatchCard.vue';
  import AppMovieCard from '@/components/cards/AppMovieCard.vue';
import { getNotifications } from '@/services/notificationService';
  import { approveRequest } from '@/services/friendService';
  import { aprooveJoin, getFilmById } from '@/services/sessionService';
export default {
  name: "AppNotificationsView",
  components: { AppButtonFilled, AppSessionInvite, AppFriendRequest, AppMatchEvent, AppMatchCard, AppMovieCard },
  data() {
    return {
      notifications: [],
      test_user: {
        picture: "http://localhost:9000/img/avatar_d618515e-3213-4cc8-b851-ea51e98a7c16.png",
        login: "Данил",
      },
      match: null, 
      card: null
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
    close_movie() {
      this.card = null;
    },
    about_match() {
      this.card = this.match;
      this.match = null;
    },
    close_match() {
      this.match = null;
    },
    async openMatch(id) {
      const film_response = await getFilmById(id, localStorage.getItem('access_token'));
      this.match = film_response;

    },
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

  .col {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .modals {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>