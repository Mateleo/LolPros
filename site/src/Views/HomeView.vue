<script setup lang="ts">
import Header from "../components/Header.vue";
import Top10 from "../components/Top10.vue";
import LastGames from "../components/LastGames.vue";
import PlayerOfTheDay from "../components/PlayerOfTheDay.vue";
import { useStore } from "@/stores/store";

let LP = [
  2468, 2452, 2436, 2420, 2437, 2447, 2464, 2448, 2465, 2468, 2485, 2502, 2518, 2531,
  2548, 2565, 2549, 2534, 2518, 2502, 2486, 2470,
];

const store = useStore();

console.log(store.getStreak(LP.reverse()));
</script>

<template>
  <Header></Header>
  <main class="mt-9 flex justify-center max-w-[1400px] m-auto flex-col lg:flex-row w-[95%] lg:w-full">
    <div class="flex flex-col lg:mr-5 grow">
      <PlayerOfTheDay></PlayerOfTheDay>
      <Top10></Top10>
    </div>
    <div class="mt-5 lg:mt-0">
      <LastGames></LastGames>
    </div>
  </main>
</template>
