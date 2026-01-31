// src/store/ws.js
import { defineStore } from "pinia";

export const useWSStore = defineStore("ws", {
  state: () => ({
    socket: null,
    connected: false,
  }),

  actions: {
    connect() {
      if (this.socket) return;

      const token = localStorage.getItem("access_token");

      const url = token
        ? `ws://localhost:8000/ws?token=${token}`
        : `ws://localhost:8000/ws`;

      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        this.connected = true;
        console.log("✅ WS connected");
      };

      this.socket.onclose = () => {
        this.connected = false;
        this.socket = null;
        console.log("🔌 WS disconnected");
      };

      this.socket.onerror = (e) => {
        console.error("❌ WS error", e);
      };
    },

    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    },

    onMessage(handler) {
      if (!this.socket) return;

      this.socket.onmessage = (event) => {
        try {
          handler(JSON.parse(event.data));
        } catch {
          console.error("Invalid WS payload");
        }
      };
    },
  },
});
