<script setup lang="ts">
import { useStore } from "@/stores/store";

const store = useStore();

function EmblemImage(tier: string) {
  return store.ToLowerWithoutFirst(tier)
    ? "../../emblems/Emblem_" + store.ToLowerWithoutFirst(tier) + ".png"
    : "../../emblems/Emblem_Iron.png";
}

function PositionImage(role: string) {
  return store.ToLowerWithoutFirst(role)
    ? "../../positions/" + store.ToLowerWithoutFirst(role) + ".svg"
    : "../../positions/adc.svg";
}

function mockup(img: any) {
  if (!img) {
    return "../../logo.png";
  }
  return img;
}

function route(account: string) {
  return "/player/" + account;
}
function routeTeam(account: string | undefined) {
  return account ? "/team/" + account : "";
}

function lpDisplayWithRank(lp: number, rank: string, tier: string) {
  if (tier != "MASTER") {
    return rank + " - " + lp;
  }
  return lp;
}
</script>

<template>
  <main class="bg-[#22262B] p-3 md:px-5 px-2 flex flex-col max-w-[1200px]">
    <div class="flex justify-between">
      <h2 class="text-cyan-500 text-xl font-bold">Top 10</h2>
      <!-- <p class="">Complete ladder</p> -->
    </div>
    <div class="bg-[#292E35] p-2 px-0 md:px-5">
      <div
        v-for="(user, index) in store.Leaderboard"
        class="border-b-2 border-gray-900 flex flex-nowrap justify-between px-3 my-2"
        :class="index == store.Leaderboard.length - 1 ? ['border-b-0'] : ''"
      >
        <div class="flex items-center py-4">
          <img
            class="w-[50px] mr-5 hidden sm:block rounded-lg"
            :src="user.profileIcon"
            alt=""
          />
          <router-link
            :to="route(user.name)"
            class="font-semibold text-lg hover:text-cyan-400 transition-colors ease-in-out w-[170px]"
            >{{ user.name }}
            {{
              Math.abs(
                store.getStreak([...user.LPHisto].map((e) => e.LP).reverse()).slice(-1)[0]
              ) > 2
                ? store
                    .getStreak([...user.LPHisto].map((e) => e.LP).reverse())
                    .slice(-1)[0]>0
                  ? "🔥"
                  : "😰"
                : ""
            }}</router-link
          >
        </div>
        <div class="flex sm:justify-between justify-end max-w-[300px] grow items-center">
          <img
            class="w-[32px] h-[32px] hidden sm:block"
            :src="PositionImage(user.role)"
            alt=""
          />
          <div class="flex flex-col justify-center">
            <img
              class="object-cover w-[90px] h-[50px] m-auto"
              :src="EmblemImage(user.tier)"
              alt=""
            />
            <p class="text-md font-semibold text-center leading-none">
              {{ lpDisplayWithRank(user.LP, user.rank, user.tier) }}
            </p>
          </div>
          <router-link :to="routeTeam(user.team)">
            <img
              :src="mockup(user.teamLogo)"
              alt=""
              class="h-[32px] hidden sm:block rounded-md"
            />
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
