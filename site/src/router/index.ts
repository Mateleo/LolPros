import { useStore } from "@/stores/store";
import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import PlayereView from "../Views/PlayerView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      let store = useStore();
      if (store.Leaderboard.length == 0) {
        await store.fetchLeaderboard();
      }
      return true;
    },
  },
  {
    path: "/player/:playerid",
    name: "Player",
    component: PlayereView,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      let store = useStore();
      if (typeof to.params.playerid == "string") {
        await store.fetchProfile(to.params.playerid);
      } else {
        await store.fetchProfile(to.params.playerid[0]);
      }
      return true;
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.name == "Player") {
//     const store = useStore();
//     if (typeof to.params.playerid == "string") {
//       store.fetchProfile(to.params.playerid);
//     } else {
//       store.fetchProfile(to.params.playerid[0]);
//     }
//   }
// });

export default router;
