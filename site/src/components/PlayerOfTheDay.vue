<script setup lang="ts">
import { useStore } from "@/stores/store";
const store = useStore();

function route(account: string) {
  return "/player/" + account;
}
</script>
<template>
  <div class="bg-[#22262B] p-3 md:px-5 px-2 flex flex-col max-w-[1200px] mb-5">
    <div class="flex justify-between">
      <h2 class="text-cyan-500 text-xl font-bold">Players of the Day</h2>
      <!-- <p class="">Complete ladder</p> -->
    </div>
    <div class="bg-[#292E35] p-2 px-5 grid grid-cols-2">
      <div class="flex flex-col">
        <router-link
          :to="route(store.inter.name)"
          class="font-semibold text-lg text-center hover:text-cyan-400 transition-colors ease-in-out"
        >
          {{ store.inter.name }}
        </router-link>
        <div>
          <img
            :src="store.inter.profileIcon"
            alt=""
            class="w-[50px] hidden sm:block rounded-lg m-auto"
          />
        </div>
        <div class="h-[35px] mt-1 flex">
          <div
            class="m-auto rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm bg-red-500 shadow-red-900 hover:bg-red-800 hover:border-2 hover:border-red-400 transition-colors ease-in-out cursor-pointer"
          >
            {{ ["", "+"][+(store.inter.gains > 0)] + store.inter.gains }} LP
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <router-link
          :to="route(store.winner.name)"
          class="font-semibold text-lg text-center hover:text-cyan-400 transition-colors ease-in-out"
        >
          {{ store.winner.name }}
        </router-link>
        <div>
          <img
            :src="store.winner.profileIcon"
            alt=""
            class="w-[50px] hidden sm:block rounded-lg m-auto"
          />
        </div>
        <div class="h-[35px] mt-1 flex">
          <div
            class="m-auto rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm bg-green-500 shadow-green-900 hover:bg-green-800 hover:border-2 hover:border-green-500 transition-colors ease-in-out cursor-pointer"
          >
            {{ ["", "+"][+(store.winner.gains > 0)] + store.winner.gains }} LP
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
