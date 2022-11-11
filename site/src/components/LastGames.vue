<script setup lang="ts">
import { useStore } from "@/stores/store";
import moment from "moment";

const store = useStore();


function route(account: string) {
  return "/player/" + account;
}
</script>

<template>
  <main
    class="bg-[#22262B] p-3 md:px-5 px-2 flex flex-col lg:m-auto mt-0 max-w-[1100px] lg:min-w-[400px]"
  >
    <div class="flex justify-between">
      <h2 class="text-cyan-500 text-xl font-bold">Last Games</h2>
      <!-- <p class="">Complete ladder</p> -->
    </div>
    <div class="bg-[#292E35] p-2 px-0 md:px-5">
      <div
        v-for="(user, index) in store.LastGames"
        class="border-b-2 border-gray-900 flex flex-nowrap justify-between px-3 my-2 items-center pb-2"
        :class="index == store.LastGames.length - 1 ? ['border-b-0'] : ''"
      >
        <div>
          <router-link :to="route(user.name)" class="font-semibold text-lg hover:text-cyan-400 transition-colors ease-in-out">{{
            user.account
          }}</router-link>
          <p class="text-white/40 text-sm">
            ({{ moment(user.date).format("DD/MM à HH:mm") }})
          </p>
        </div>
        <div
          class="rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm shadow-green-900 transition-colors ease-in-out cursor-pointer"
          :class="
            user.diff.toString()[0] != '-'
              ? [
                  'bg-green-500 shadow-green-900 hover:bg-green-800 hover:border-2 hover:border-green-500',
                ]
              : [
                  'bg-red-500 shadow-red-900 hover:bg-red-800 hover:border-2 hover:border-red-400',
                ]
          "
        >
          {{ ["", "+"][+(user.diff > 0)] + user.diff }} LP
        </div>
      </div>
    </div>
  </main>
</template>
