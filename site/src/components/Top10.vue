<script setup lang="ts"></script>

<template>
  <main class="bg-[#22262B] p-3 px-5 flex flex-col w-[60%] m-auto">
    <div class="flex justify-between">
      <h2 class="text-cyan-500 text-xl font-bold">Top 10</h2>
      <p class="">Complete ladder</p>
    </div>
    <div class="bg-[#292E35] p-2 px-5">
      <div v-for="i in 10" :key="i" class="border-b-2 border-gray-900">
        <div class="flex items-center py-4">
            <img class="w-[40px] mr-5" src="https://flagcdn.com/fr.svg" alt="" />
          <h3 class="font-bold">Mateleo</h3>
        </div>
      </div>
    </div>
  </main>
</template>
