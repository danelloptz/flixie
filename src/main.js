import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import './assets/global.css'
import './assets/colors.css'
import './assets/text.css'

createApp(App).use(store).use(router).mount("#app");