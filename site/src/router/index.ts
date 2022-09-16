import { useStore } from "@/stores/store";
import { useHead } from "@vueuse/head";
import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import HomeView from "../Views/HomeView.vue";
import PlayerView from "../Views/PlayerView.vue";
import TeamView from "../Views/TeamView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      document.title = "LolPros.4eS";
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
    component: PlayerView,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      useHead({
        title: "TEST",
        meta:[
          {
            name:"description",
            content:"Voici le profil de Manguier"
          }
        ]
      })
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
    meta: {
      title: "Home Page - Example App",
      metaTags: [
        {
          name: "description",
          content: "The home page of our example app.",
        },
        {
          property: "og:description",
          content: "The home page of our example app.",
        },
      ],
    },
  },
  {
    path: "/team/:teamid",
    name: "Team",
    component: TeamView,
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
