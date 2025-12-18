<template>
  <section class="home">
    <AppNotification 
      v-if="isNotification" 
      :title="title_notification" 
      :message="text_notification" 
      :visibility="isNotification" 
      @update:visibility="isNotification = $event" 
      @close="close"
    />
    <section class="sessions">
      <AppSessionCard 
        v-for="(item, index) in sessions"
        :key="index"
        :session="item"
      />
    </section>
  </section>
</template>

<script>
  import { sendFriendNotification } from '@/services/friendService';
  import AppNotification from '@/components/other/AppNotification.vue';
  import { getSessions, getSessionParticipants } from '@/services/sessionService';
  import AppSessionCard from '@/components/cards/AppSessionCard.vue';
export default {
  name: "HomeView",
  components: { AppNotification, AppSessionCard },

  data() {
    return {
      socket: null,
      sessions: null,
      isNotification: false,
      text_notification: null,
      title_notification: null,
    };
  },

  mounted() {
    this.connectWebSocket();
  },

  beforeUnmount() {
    this.disconnectWebSocket();
  },

  async created() {
    const sessions_response = await getSessions(localStorage.getItem('access_token'));
    this.sessions = sessions_response;
  },

  methods: {
    close() {
      this.isNotification = false;
    },
    async send() {
      await sendFriendNotification(47, localStorage.getItem('access_token'));
    },
    connectWebSocket() {
      const token = localStorage.getItem("access_token"); // если есть

      const url = token
        ? `ws://localhost:8000/ws?token=${token}`
        : `ws://localhost:8000/ws`;

      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("✅ WebSocket connected");
      };

      this.socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.handleNotification(payload);
        } catch (e) {
          console.error("❌ Invalid WS message", event.data);
        }
      };

      this.socket.onerror = (error) => {
        console.error("❌ WebSocket error", error);
      };

      this.socket.onclose = () => {
        console.log("🔌 WebSocket disconnected");
      };
    },

    disconnectWebSocket() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    },

    handleNotification(payload) {
      switch (payload.type) {
        case "friend_request":
          this.onFriendRequest(payload);
          break;

        case "session_invite":
          this.onSessionInvite(payload);
          break;

        case "match_event":
          this.onMatchEvent(payload);
          break;

        default:
          console.warn("⚠️ Unknown notification type", payload);
      }
    },

    onFriendRequest(payload) {
      this.isNotification = true;
      this.title_notification = 'ЗАПРОС В ДРУЗЬЯ';
      this.text_notification = 'К вам пришёл запрос в друзья';
      console.log('👤 Friend request received', payload);
      // alert("👤 Friend request received", payload);
      // TODO: добавить уведомление
    },

    onSessionInvite(payload) {
      alert("🎬 Session invite received", payload);
      // TODO: открыть экран сессии
    },

    onMatchEvent(payload) {
      alert("🔥 Match event received", payload);
      // TODO: обновить рекомендации
    },
  },
};
</script>

<style scoped>

  .home {
    width: 100%;
    padding: 0px 17px;
    display: flex;
    flex-direction: column;
  }

  .sessions {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
