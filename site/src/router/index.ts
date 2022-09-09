import { useStore } from "@/stores/store";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import PlayereView from "../Views/PlayerView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/player/:playerid",
    name: "Player",
    component: PlayereView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.name == "Player") {
    const store = useStore();
    store.fetchProfile(to.params.playerid[0]);
  }
});

export default router;
