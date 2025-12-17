import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./registerServiceWorker";
import './assets/global.css'
import './assets/colors.css'
import './assets/text.css'
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");