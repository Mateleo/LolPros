<script setup lang="ts">
import { useStore } from "@/stores/store";
import { useHead } from "@vueuse/head";
import { ref } from "vue";
import Header from "../components/Header.vue";
import Top10 from "../components/Top10.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const store = useStore();

let accountIndex = ref(0);
let pageIndex = ref(0);

function route(account: string) {
  return "/player/" + account;
}

function EmblemImage(mode?: string) {
  let oninput = "";
  if (mode) {
    oninput = mode;
  } else {
    oninput = store.getAllAcounts[accountIndex.value].tier;
  }
  return store.ToLowerWithoutFirst(oninput)
    ? "../../emblems/Emblem_" + store.ToLowerWithoutFirst(oninput) + ".png"
    : "../../emblems/Emblem_Iron.png";
}

function PositionImage(role: string) {
  return store.ToLowerWithoutFirst(role)
    ? "../../positions/" + store.ToLowerWithoutFirst(role) + ".svg"
    : "../../positions/adc.svg";
}

function winrate(win: number, losses: number) {
  let winrate = (win / (win + losses)) * 100;
  return winrate.toFixed(1) + "%";
}

function HighestCLP() {
  return [...store.getAllAcounts[accountIndex.value].LPHisto].sort((a, b) => {
    return b.LP - a.LP;
  })[0];
}

console.log(store.getAllAcounts[accountIndex.value].LPHisto.map((hist) => hist.LP));

function fetchTeam() {
  if (store.User.team) {
    store.fetchTeam(store.User.team);
  }
}
fetchTeam();
</script>

<template>
  <Header></Header>
  <main
    class="lg:grid lg:grid-cols-12 flex flex-col w-[95%] max-w-[1300px] lg:w-[85%] xl:w-[75%] m-auto mt-10"
  >
    <div
      class="flex md:flex-col sm:flex-row justify-between flex-col m-auto sm:m-0 col-span-3"
    >
      <div
        class="aspect-square md:w-[300px] w-[270px] m-auto lg:m-0 lg:w-auto mb-2 lg:mb-0 flex flex-col bg-[#22262B] p-6 shadow-lg shadow-black/10"
      >
        <img
          class="w-[112px] h-[112px] m-auto rounded-full shadow-md shadow-black"
          :src="store.getAllAcounts[accountIndex].profileIcon"
          alt=""
        />
        <h2 class="text-xl text-center">{{ store.getUserName }}</h2>
        <div class="flex justify-center mb-4">
          <div
            class="rounded-full rounded-r-none py-1 w-[50px] text-center font-semibold text-sm bg-green-500 shadow-green-900"
          >
            +{{ store.getAllAcounts[accountIndex].agvWins }}
          </div>
          <div
            class="rounded-full rounded-l-none py-1 w-[50px] text-center font-semibold text-sm bg-red-500 shadow-red-900"
          >
            {{ store.getAllAcounts[accountIndex].avgLosses }}
          </div>
        </div>
        <div class="p-2 bg-[#292E35] flex">
          <img
            class="w-[24px] h-[24px] mr-3"
            :src="PositionImage(store.User.role)"
            alt=""
          />
          <h3>{{ store.User.role.toLocaleUpperCase() }}</h3>
        </div>
        <div class="p-2 bg-[#292E35] flex mt-2">
          <img
            class="w-[24px] h-[24px] mr-3"
            :src="PositionImage(store.User.role)"
            alt=""
          />
          <h3>{{ store.User.rankByRole }}</h3>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:ml-10 col-span-9">
      <nav class="flex">
        <button
          @click="pageIndex = 0"
          :class="pageIndex == 0 ? 'border-cyan-300' : ''"
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          ACCOUNTS
        </button>
        <button
          @click="pageIndex = 1"
          :class="pageIndex == 1 ? 'border-cyan-300' : ''"
          class="p-3 px-4 border-b-[5px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in"
        >
          TEAM
        </button>
      </nav>
      <div v-if="pageIndex == 0" class="mt-2 w-full">
        <div class="flex flex-wrap">
          <button
            v-for="(account, index) in store.getAllAcounts"
            class="bg-[#22262B] border-[1px] border-transparent flex px-4 py-2 rounded-sm mr-5 mt-2 hover:bg-black/10 hover:border-white/10"
            @click="accountIndex = index"
            :class="accountIndex == index ? ['border-white/10'] : ''"
          >
            <img
              class="w-[24px] h-[24px] m-auto rounded-full mr-2"
              :src="account.profileIcon"
              alt=""
            />
            <p class="text-sm text-cyan-300">{{ account.name }}</p>
          </button>
        </div>
        <div class="flex mt-5 flex-col md:flex-row">
          <div class="flex flex-col md:mr-4">
            <div class="flex flex-col">
              <div
                class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
              >
                <h2 class="ml-2">Current Elo</h2>
                <a
                  class="bg-sky-400 px-2 py-1 text-sm"
                  :href="
                    'https://euw.op.gg/summoners/euw/' +
                    store.getAllAcounts[accountIndex].name
                  "
                  target="_blank"
                  >OP.GG</a
                >
              </div>
              <div class="bg-[#22262B] flex justify-between px-2 mt-2">
                <img
                  class="object-cover w-[120px] h-[80px]"
                  :src="EmblemImage()"
                  alt=""
                />
                <div class="flex flex-col text-right text-sm p-4 leading-3">
                  <p>
                    {{
                      store.ToLowerWithoutFirst(store.getAllAcounts[accountIndex].tier)
                    }}
                    {{ store.getAllAcounts[accountIndex].rank }}
                  </p>
                  <p>{{ store.getAllAcounts[accountIndex].LP }}</p>
                  <p>
                    {{ store.getAllAcounts[accountIndex].wins }}/{{
                      store.getAllAcounts[accountIndex].losses
                    }}
                    ({{
                      winrate(
                        store.getAllAcounts[accountIndex].wins,
                        store.getAllAcounts[accountIndex].losses
                      )
                    }})
                  </p>
                  <p>
                    {{
                      new Date(
                        store.getAllAcounts[accountIndex].LPHisto[0].date
                      ).toLocaleDateString()
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-5">
              <div
                class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
              >
                <h2 class="ml-2">Peak Elo</h2>
              </div>
              <div class="bg-[#22262B] flex justify-between px-2 mt-2">
                <img
                  class="object-cover w-[120px] h-[80px]"
                  :src="
                    EmblemImage(
                      store.ToLowerWithoutFirst(store.CLPtoObject(HighestCLP().LP).tier)
                    )
                  "
                  alt=""
                />
                <div class="flex flex-col text-right text-sm p-4 leading-3">
                  <p>
                    {{
                      store.ToLowerWithoutFirst(store.CLPtoObject(HighestCLP().LP).tier)
                    }}
                    {{ store.CLPtoObject(HighestCLP().LP).rank }}
                  </p>
                  <p>{{ store.CLPtoObject(HighestCLP().LP).LP }}</p>
                  <p>{{ new Date(HighestCLP().date).toLocaleDateString() }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col grow mt-5 md:mt-0">
            <div
              class="flex justify-between border-l-[3px] border-cyan-300 border-transparent"
            >
              <h2 class="ml-2">Rank History</h2>
            </div>
            <div class="mt-2 shrink relative">
              <Line
                class="bg-[#22262B]"
                :chart-options="{
                  maintainAspectRatio: false,
                  responsive: true,
                }"
                :chart-data="{
                  datasets: [
                    {
                      label: 'LP Cumulés',
                      data: [
                        ...store.getAllAcounts[accountIndex].LPHisto.map(
                          (hist) => hist.LP
                        ),
                      ].reverse(),
                      borderColor: '#38bdf8',
                      borderWidth: 3,
                    },
                  ],
                  labels: [
                    ...store.getAllAcounts[accountIndex].LPHisto.map((hist) =>
                      new Date(hist.date).toLocaleDateString('fr')
                    ),
                  ].reverse(),
                }"
              ></Line>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageIndex == 1" class="mt-2 w-full">
        <div
          class="bg-[#292E35] p-2 shadow-lg shadow-black/10 flex flex-col grow mt-5 md:mt-0"
        >
          <div
            v-for="(user, index) in store.Team.players"
            class="border-b-2 border-gray-900 flex flex-nowrap justify-between md:px-3 px-2 py-2 items-center"
            :class="index == store.Team.players.length - 1 ? ['border-b-0'] : ''"
          >
            <div class="flex items-center">
              <img
                :src="PositionImage(user.role)"
                alt=""
                class="md:w-[38px] w-[28px] md:mr-2 mr-4"
              />
              <img
                :src="user.profileIcon"
                alt=""
                class="w-[32px] rounded-md mr-4 hidden md:block"
              />
              <router-link
                :to="route(user.name)"
                class="text-lg font-semibold hover:text-cyan-400 transition-colors ease-in-out"
                >{{ user.name }}</router-link
              >
            </div>
            <div class="flex items-center w-[160px]">
              <img
                :src="EmblemImage(user.tier)"
                alt=""
                class="w-[32px] md:w-[38px] mr-2"
              />
              <p class="text-md">
                {{ store.ToLowerWithoutFirst(user.tier) }} {{ user.rank }}
                {{ user.LP }} LP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
