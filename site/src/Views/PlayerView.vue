<script setup lang="ts">
import { useStore } from "@/stores/store";
import { ref } from "vue";
import Header from "../components/Header.vue";
import Top10 from "../components/Top10.vue";

const store = useStore();

let accountIndex = ref(0)

function EmblemImage() {
  return store.ToLowerWithoutFirst(store.getAllAcounts[accountIndex.value].tier)
    ? "../../emblems/Emblem_" +
        store.ToLowerWithoutFirst(store.getAllAcounts[accountIndex.value].tier) +
        ".png"
    : "../../emblems/Emblem_Iron.png";
}
</script>

<template>
  <Header></Header>
  <main class="flex w-[90%] m-auto mt-6">
    <div class="flex flex-col">
      <div
        class="aspect-square w-[300px] flex flex-col bg-[#22262B] p-6 shadow-lg shadow-black/10"
      >
        <img
          class="w-[112px] h-[112px] m-auto rounded-full shadow-md shadow-black"
          :src="store.getAllAcounts[accountIndex].profileIcon"
          alt=""
        />
        <h2 class="text-xl text-center">{{ store.getUserName }}</h2>
        <div class="m-auto">social networks</div>
        <div></div>
        <div class="p-2 bg-[#292E35] flex">
          <img class="w-[24px] h-[24px] mr-3" src="../assets/positions/adc.svg" alt="" />
          <h3>ADC</h3>
        </div>
        <div class="p-2 bg-[#292E35] flex mt-2">
          <img class="w-[24px] h-[24px] mr-3" src="../assets/positions/adc.svg" alt="" />
          <h3>ADC</h3>
        </div>
      </div>
      <div
        class="w-[300px] flex flex-col bg-[#22262B] p-6 mt-8 shadow-lg shadow-black/10"
      >
        <div class="flex justify-between p-2">
          <div class="flex">
            <img
              class="w-[24px] h-[24px] mr-2"
              src="../assets/positions/adc.svg"
              alt=""
            />
            <p>Adc</p>
          </div>
          <p class="font-bold">1</p>
        </div>
        <div class="flex justify-between mt-4 p-2">
          <div class="flex">
            <img
              class="w-[24px] h-[24px] mr-2"
              src="../assets/positions/adc.svg"
              alt=""
            />
            <p>Adc</p>
          </div>
          <p class="font-bold">1</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col ml-5">
      <nav class="flex">
        <button
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          ACCOUNTS
        </button>
        <button
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          ACCOUNTS
        </button>
        <button
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          ACCOUNTS
        </button>
        <button
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          ACCOUNTS
        </button>
      </nav>
      <div class="flex flex-wrap">
        <div
          v-for="account,index in store.getAllAcounts"
          class="bg-[#22262B] border-[1px] border-transparent flex px-4 py-2 rounded-sm mr-5 mt-2"
          @click="accountIndex = index"
        >
          <img
            class="w-[24px] h-[24px] m-auto rounded-full mr-2"
            :src="account.profileIcon"
            alt=""
          />
          <p class="text-sm text-cyan-300">{{account.name}}</p>
        </div>
      </div>
      <div class="flex mt-5">
        <div class="flex flex-col mr-4">
          <div class="flex flex-col">
            <div
              class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
            >
              <h2 class="ml-2">Current Elo</h2>
              <button class="bg-sky-400 px-2 py-1 text-xs">OP.GG</button>
            </div>
            <div class="bg-[#22262B] flex justify-between px-2 mt-2">
              <img class="object-cover w-[120px] h-[80px]" :src="EmblemImage()" alt="" />
              <div class="flex flex-col text-right text-xs p-4 leading-3">
                <p>{{ store.ToLowerWithoutFirst(store.getAllAcounts[accountIndex].tier) }}</p>
                <p>{{ store.getAllAcounts[accountIndex].LPC }}</p>
                <p>
                  {{ store.getAllAcounts[accountIndex].wins }}/{{ store.getAllAcounts[accountIndex].losses }} ()
                </p>
                <p>25/05</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-5">
            <div
              class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
            >
              <h2 class="ml-2">Peak Elo</h2>
              <button class="bg-sky-400 px-2 py-1 text-xs">OP.GG</button>
            </div>
            <div class="bg-[#22262B] flex justify-between px-2 mt-2">
              <img
                class="object-cover w-[120px] h-[80px]"
                src=""
                alt=""
              />
              <div class="flex flex-col text-right text-xs p-4 leading-3">
                <p>Challenger</p>
                <p>1864LP</p>
                <p>642/519 (55%)</p>
                <p>25/05</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col grow">
          <div
            class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
          >
            <h2 class="ml-2">Peak Elo</h2>
          </div>
          <div class="bg-[#22262B] aspect-square grow mt-2"></div>
        </div>
      </div>
    </div>
  </main>
</template>
