import "./styles/index.scss";

import { add } from "./tools/add.js";
import { createApp } from "vue";
import App from "@/App.vue";

console.log(add(1, 2));
console.log("我是main.js");

createApp(App).mount("#app");
