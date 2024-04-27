import VueLatex from "@richdom2185/vue-latex";
import "katex/dist/katex.min.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createApp } from "vue";
import vueDebounce from "vue-debounce";
import App from "./App.vue";
import { router } from "./routes";
import "./style.css";

const app = createApp(App);
app.directive("debounce", vueDebounce({ lock: true }));
app.use(router);
app.use(PrimeVue);
app.use(VueLatex);
app.mount("#app");
