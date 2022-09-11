<script setup lang="ts"></script>

<template>
  <main class="bg-[#22262B] p-3 px-5 flex flex-col w-[60%] m-auto">
    <div class="flex justify-between">
      <h2 class="text-cyan-500 text-xl font-bold">Top 10</h2>
      <p class="">Complete ladder</p>
    </div>
    <div class="bg-[#292E35] p-2 px-5">
      <div
        v-for="i in 10"
        :key="i"
        class="border-b-2 border-gray-900 flex flex-nowrap justify-between px-3 my-2"
      >
        <div class="flex items-center py-4">
          <img class="w-[40px] mr-5" src="https://flagcdn.com/fr.svg" alt="" />
          <router-link to="/player" class="font-bold hover:text-cyan-400 transition-colors ease-in-out">Mateleo</router-link>
        </div>
        <div class="flex justify-between max-w-[300px] grow items-center">
          <img class="w-[32px] h-[32px]" src="../assets/positions/adc.svg" alt="" />
          <div class="flex flex-col justify-center">
            <img class="h-[32px] m-auto" src="../../public/emblems/Emblem_Challenger.png" alt="" />
            <p class="text-sm text-center">867 LP</p>
          </div>
          <p class="font-bold text-xl text-center">-</p>
        </div>
      </div>
    </div>
  </main>
</template>
