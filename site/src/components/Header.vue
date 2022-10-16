<script setup lang="ts">
import { useStore } from "@/stores/store";
import { ref } from "vue";

let searchTerm = ref("");
let selected = ref(false);
let selected2 = ref(false);
const store = useStore();

function filteredList() {
  console.log(searchTerm.value);
  return [...store.Leaderboard]
    .filter((player) =>
      player.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .slice(0, 4);
}

</script>
<template>
  <header class="flex bg-[#292E35] shadow-lg items-center sticky top-0 h-[68px]">
    <router-link class="px-2 border-r-[1px] border-gray-600 flex flex-row-reverse" to="/">
      <h1 class="hidden lg:block text-3xl ml-4">4ESLOLPROS</h1>
      <img
        src="../assets/logo-white.3301580.svg"
        alt=""
        class="rounded-full w-[36px] aspect-square"
      />
    </router-link>
    <div
      class="max-w-[50%] grow m-auto mt-2 p-2 rounded-lg"
      :class="selected ? [' bg-black/40 shadow-lg shadow-black/70 backdrop-blur-[5px]'] : ['']"
      v-auto-animate="{ duration: 120 }"
    >
      <input
        v-model="searchTerm"
        placeholder="Search for a player..."
        @focusin="selected=!selected"
        @focusout="!selected2 ? selected=!selected : ''"
        class="w-full hidden md:block bg-[#292E35] border-[1px] border-gray-600 p-2 focus:outline-none focus:border-sky-400 focus:border-2 focus:rounded-lg"
      />
      <div class="m-auto flex flex-col w-full" v-if="selected" v-auto-animate>
        <router-link  v-for="player in filteredList()" :key="player.name" :to="'/player/'+player.name" @mouseenter="selected2=true" @mouseleave="selected2=false">
          <div class="flex items-center py-4">
            <img
              class="w-[50px] mr-5 hidden sm:block rounded-lg"
              :src="player.profileIcon"
              alt=""
            />
            <p class="font-semibold text-lg w-[170px]">
              {{ player.name }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <nav class="flex justify-between px-4 h-full">
      <router-link
        to=""
        class="h-full border-b-[6px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in grow"
        >LADDERS (WIP)</router-link
      >
      <!-- <router-link
        to=""
        class="ml-4 h-full border-b-[6px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in grow"
        >LADDERS</router-link
      >
      <router-link
        to=""
        class="ml-4 h-full border-b-[6px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in grow"
        >LADDERS</router-link
      > -->
    </nav>
  </header>
</template>
