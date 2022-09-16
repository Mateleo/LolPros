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
  LP:number;
  teamLogo?:string;
  team?:string
  role:string
  logo?:string,
}

interface user {
  playerName: string;
  playerTeam: string;
  teamId: number;
  accounts: [account];
  role:string
}

interface team{
  id:string,
  name:string,
  teamLogo:string,
  players: [account]
}

export const useStore = defineStore("main", {
  state: () => ({
    User: {} as user,
    Leaderboard: [] as account[],
    Team: {} as team
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
    async fetchTeam(team: string) {
      await axios
        .get("https://api.4esport.fr/lolpros/team/" + team)
        .then((res) => {
          this.Team = res.data;
          console.log(this.Team)
        })
        .catch((err) => console.log(err));
        console.log("User fetched !")
    },
    async fetchLeaderboard() {
      await axios
        .get("https://api.4esport.fr/lolpros/leaderboard")
        .then((res) => {
          this.Leaderboard = res.data.response;
          console.log(this.Leaderboard)
        })
        .catch((err) => console.log(err));
        console.log("Leaderboard fetched !")
    },
    ToLowerWithoutFirst(s:string | undefined):string{
      return s ? s[0]+s.slice(1).toLocaleLowerCase() : ""
    }
  },
});
