<script setup lang="ts"></script>
<template>
  <header class="flex bg-[#292E35] shadow-lg items-center sticky top-0 h-[68px]" v-once>
    <router-link class=" px-2 border-r-[1px] border-gray-600" to="/">
      <h1 class="hidden lg:block text-3xl">4ESLOLPROS</h1>
      <img src="../assets/logo-white.3301580.svg" alt="" class="block lg:hidden rounded-full w-[36px] aspect-square">
    </router-link>
    <div class="grow flex">
      <input
        class="hidden md:block max-w-[60%] grow m-auto bg-[#292E35] border-[1px] border-gray-600 p-2 focus:outline-none focus:border-cyan-900 focus:border-2"
        type="text"
        placeholder="Search... (WIP)"
      />
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
