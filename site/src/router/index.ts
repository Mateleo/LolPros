import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue"
import Player from "@/components/Player.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/player",
    name: "Player",
    component: Player,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
