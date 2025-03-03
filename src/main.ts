import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./assets/css/style.css";
import "./assets/css/global.css";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "./assets/styles/main.css";

// 引入字体图标库
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

// 初始化存储
store.dispatch("initializeStore");

app.use(store).use(router).use(i18n).use(ArcoVue).mount("#app");
