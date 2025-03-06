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

// 定义支持的语言类型
type SupportedLocale = "zh" | "en" | "jp";

// 验证语言代码是否有效
const isValidLocale = (locale: string | null): locale is SupportedLocale => {
  return locale === "zh" || locale === "en" || locale === "jp";
};

// 初始化存储
store.dispatch("initializeStore");

// 从store同步初始语言到i18n
const savedLang = localStorage.getItem("preferredLanguage");
if (savedLang && isValidLocale(savedLang)) {
  i18n.global.locale.value = savedLang;
}

const app = createApp(App);

app.use(store).use(router).use(i18n).use(ArcoVue).mount("#app");
