<script setup lang="ts">
import { useStore } from "@/stores/store";
import Header from "../components/Header.vue";
import Top10 from "../components/Top10.vue";

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

function lpDisplayWithRank(lp: number, rank: string, tier: string) {
  if (tier != "MASTER") {
    return rank + " - " + lp;
  }
  return lp;
}
</script>
<template>
  <Header></Header>
  <main>
    <div class="flex justify-center mt-10 max-w-[2000px] m-auto w-[95%] flex-col md:flex-row">
      <div
        class="aspect-square w-[300px] flex flex-col bg-[#22262B] p-6 shadow-lg shadow-black/10 md:mr-5 m-auto"
      >
        <img
          class="w-[112px] h-[112px] m-auto rounded-full shadow-md shadow-black"
          :src="store.Team.teamLogo"
          alt=""
        />
        <h2 class="text-xl text-center">{{ store.Team.name }}</h2>
        <div class="m-auto">social networks</div>
      </div>
      <div class="bg-[#292E35] p-2 shadow-lg shadow-black/10 flex flex-col grow max-w-[700px] mt-5 md:mt-0">
        <div
          v-for="(user, index) in store.Team.players"
          class="border-b-2 border-gray-900 flex flex-nowrap justify-between md:px-3 px-2 py-2 items-center"
          :class="index == store.Team.players.length - 1 ? ['border-b-0'] : ''"
        >
          <div class="flex items-center">
            <img :src="PositionImage(user.role)" alt="" class="md:w-[38px] w-[28px] md:mr-2 mr-4" />
            <img :src="user.logo" alt="" class="w-[32px] rounded-md mr-4 hidden md:block" />
            <router-link :to="route(user.name)" class="text-lg font-semibold hover:text-cyan-400 transition-colors ease-in-out">{{ user.name }}</router-link>
          </div>
          <div class="flex items-center w-[160px]">
            <img :src="EmblemImage(user.tier)" alt="" class="w-[32px] md:w-[38px] mr-2" />
            <p class="text-md">
              {{ store.ToLowerWithoutFirst(user.tier) }} {{ user.rank }} {{ user.LP }} LP
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
