<template>
  <div>
    <h1>Welcome to Flixie</h1>
    <button @click="send">
      rgegr
    </button>
  </div>
</template>

<script>
  import { sendFriendNotification } from '@/services/friendService';
export default {
  name: "HomeView",

  data() {
    return {
      socket: null,
      sessions: [
        {
          title: "Комната отдыха",
          participants: [
            {
              id: "vrjgnrjngr24mkmk",
              name: "Georgi Z",
              avatar: "http://localhost:9000/img/ffa000e7-9821-43ad-b9c6-750472a2da0e",
            },
          ],
          date_end: 1767078030,
        },
      ],
    };
  },

  mounted() {
    this.connectWebSocket();
  },

  beforeUnmount() {
    this.disconnectWebSocket();
  },

  methods: {
    async send() {
      await sendFriendNotification(49, localStorage.getItem('access_token'));
    },
    connectWebSocket() {
      const token = localStorage.getItem("access_token"); // если есть

      const url = token
        ? `ws://localhost:8080/ws?token=${token}`
        : `ws://localhost:8080/ws`;

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
      alert("👤 Friend request received", payload);
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
