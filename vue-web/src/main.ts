import { createApp } from "vue";
import "./style.css";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import persisted from "pinia-plugin-persistedstate";

const app = createApp(App);
// app.use(Antd);
app.use(router).use(createPinia().use(persisted));
app.mount("#app");
