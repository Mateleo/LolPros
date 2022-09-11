// stores/counter.js
import { defineStore } from "pinia";
import axios, { type AxiosRequestConfig } from "axios";

interface account {
  name: string;
  summonerLvl: number;
  profileIcon: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  LPC: number;
}

interface user {
  playerName: string;
  playerTeam: string;
  teamId: number;
  accounts: [account];
}

export const useStore = defineStore("main", {
  state: () => ({
    User: {} as user,
  }),
  getters: {
    getUserName(state) {
      return state.User.playerName;
    },
    getUserTeam(state){
      return state.User.playerTeam
    },
    getAllAcounts(state){
      return state.User.accounts
    }
  },
  actions: {
    async fetchProfile(player: string) {
      await axios
        .get("https://api.4esport.fr/lolpros/player/" + player)
        .then((res) => {
          this.User = res.data;
          console.log(this.User)
        })
        .catch((err) => console.log(err));
        console.log("User fetched !")
    },
    ToLowerWithoutFirst(s:string | undefined):string{
      return s ? s[0]+s.slice(1).toLocaleLowerCase() : ""
    }
  },
});
