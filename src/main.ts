import { createApp } from "vue";
import App from "./App.vue";
import setupElement from "./plugins/element";
import "@/styles/global.less";
import router from "@/routes";
import store from "./store";
// import "./mock";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

VueMarkdownEditor.use(vuepressTheme);

const app = createApp(App).use(router).use(store).use(VueMarkdownEditor);
setupElement(app);
app.mount("#app");
