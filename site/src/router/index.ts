import { useStore } from "@/stores/store";
import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../Views/HomeView.vue"),
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      document.title = "LolPros.4eS";
      let store = useStore();
      if (store.Leaderboard.length == 0) {
        await store.fetchLeaderboard();
        store.fetchLastGames()
      }
      return true;
    },
  },
  {
    path: "/player/:playerid",
    name: "Player",
    component: () => import("../Views/PlayerView.vue"),
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      let store = useStore();
      if (typeof to.params.playerid == "string") {
        await store.fetchProfile(to.params.playerid);
        document.title = "LolPros.4eS - " + to.params.playerid;
      } else {
        await store.fetchProfile(to.params.playerid[0]);
        document.title = "LolPros.4eS - " + to.params.playerid[0];
      }
      return true;
    },
  },
  {
    path: "/team/:teamid",
    name: "Team",
    component: () => import("../Views/TeamView.vue"),
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      let store = useStore();
      if (typeof to.params.teamid == "string") {
        await store.fetchTeam(to.params.teamid);
        document.title = "LolPros.4eS - " + to.params.teamid;
      } else {
        await store.fetchTeam(to.params.teamid[0]);
        document.title = "LolPros.4eS - " + to.params.teamid[0];
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
