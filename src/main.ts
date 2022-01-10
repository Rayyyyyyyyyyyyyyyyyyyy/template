import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/styles/tailwind.scss";
import { createStore, state } from "@/store";
import ElementPlus from "element-plus";

const app = createApp(App as any);
app.provide(state, createStore());
app.use(ElementPlus);
app.use(router);
app.mount("#app");
