<template>
  <AppModal 
    :title="title"
    :message="msg"
    :visibility="isModal"
    :isBtns="isBtns"
    :btnCancelText="btnCancelText"
    :btnAplyText="btnAplyText"
    @update:visibility="isModal = $event"
    @aply="aply"
  />
  <AppMovieCard :film="match" v-if="match" />
  <section class="home" v-if="!match" :style="{ justifyContent: sessions?.length > 0 ? 'start' : 'center' }">
    <AppNotification 
      v-if="isNotification" 
      :title="title_notification" 
      :message="text_notification" 
      :visibility="isNotification" 
      @update:visibility="isNotification = $event" 
      @close="close"
    />

    <h1 class="title">Сессии</h1>

    <div class="sessions" v-if="sessions?.length > 0">
      <AppSessionCard 
        v-for="(item, index) in sessions"
        :key="index"
        :session="item"
        @click="openSession(item.id)"
      />
    </div>
    <div class="no_sessions" v-else>
      <img src="@/assets/images/no_sessions.png" />
      <span>Создайте сессию и выберите фильм вместе!</span>
    </div>
  </section>
</template>

<script>
import AppNotification from '@/components/other/AppNotification.vue';
import AppSessionCard from '@/components/cards/AppSessionCard.vue';
import { getSessions } from '@/services/sessionService';
import AppModal from '@/components/other/AppModal.vue';
import { aprooveJoin } from '@/services/sessionService';
import { useWSStore } from "@/store/ws";
import { getFilmById } from '@/services/sessionService';

export default {
  name: "HomeView",
  components: { AppNotification, AppSessionCard, AppModal },

  data() {
    return {
      sessions: null,
      isNotification: false,
      text_notification: null,
      title_notification: null,
      match: null,
      title: "",
      msg: "",
      isModal: false,
      session_id: null,
      session_name: null,
      isBtns: false,
      btnCancelText: null,
      btnAplyText: null
    };
  },

  async created() {
    const sessions_response = await getSessions(
      localStorage.getItem("access_token")
    );
    this.sessions = sessions_response;
  },

  mounted() {
    window.addEventListener("ws-message", this.handleNotification);
  },

  beforeUnmount() {
    window.removeEventListener("ws-message", this.handleNotification);
  },

  methods: {
    async aply() {
      if (this.title == 'ПРИГЛАШЕНИЕ В СЕССИЮ') {
        const aproove_session_join = await aprooveJoin(this.session_id, localStorage.getItem('access_token'));
        if (aproove_session_join) {
          this.openSession(this.session_id);
        }
      }
    },
    openSession(session_id) {
      this.$router.push(`/sessions/play/${session_id}`);
    },

    close() {
      this.isNotification = false;
    },

    handleNotification(payload) {
      switch (payload.detail.type) {
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
      this.title_notification = "ЗАПРОС В ДРУЗЬЯ";
      this.text_notification = "К вам пришёл запрос в друзья";
      console.log("👤 Friend request received", payload);
    },

    onSessionInvite(payload) {
      console.log(payload);
      this.session_id = payload.detail.data.session_id;
      this.session_name = payload.detail.data.session_name;
      this.isModal = true;
      this.isBtns = true;
      this.btnCancelText = 'Оклонить';
      this.btnAplyText = 'Принять';
      this.title = 'ПРИГЛАШЕНИЕ В СЕССИЮ';
      this.msg = `Вам пришло приглашение в сессию ${this.session_name}. Нажмите ниже, чтобы присоединиться`;
      // alert("🎬 Session invite received");
      // TODO: перейти в сессию
    },

    async onMatchEvent(payload) {
      alert("🔥 Match event received");
      // const get_film_response = await getFilmById(payload.data.film_id, localStorage.getItem('access_token'));
      // this.match = get_film_response;
      // TODO: обновить рекомендации
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0px 17px;
  display: flex;
  flex-direction: column;
}

.sessions {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.no_sessions {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
}

.no_sessions img {
  width: 150px;
  height: 125px;
}

.no_sessions span {
  font-size: 14px;
}
.title {
  margin-top: 10px;
  margin-bottom: 20px;
  align-self: center;
  text-align: center;
}
</style>
