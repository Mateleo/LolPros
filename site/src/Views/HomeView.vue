<script setup lang="ts">
import Header from "../components/Header.vue";
import Top10 from "../components/Top10.vue";
import LastGames from "../components/LastGames.vue";
import PlayerOfTheDay from "../components/PlayerOfTheDay.vue";
</script>

<template>
  <Header></Header>
  <main class="mt-9 flex justify-center">
    <div>
      <PlayerOfTheDay></PlayerOfTheDay>
      <Top10></Top10>
    </div>
    <div class="hidden lg:block">
      <LastGames></LastGames>
    </div>
  </main>
</template>
