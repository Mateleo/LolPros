// stores/counter.js
import { defineStore } from "pinia";
import axios, { type AxiosRequestConfig } from "axios";

interface histo {
  LP: number;
  date: Date;
}

interface account {
  name: string;
  summonerLvl: number;
  profileIcon: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  LPC: number;
  LP: number;
  teamLogo?: string;
  team?: string;
  role: string;
  LPHisto: [histo];
}

interface user {
  name:string
  team:string
  teamId: number;
  accounts: [account];
  role: string;
  rankByRole: string;
  id:string
}

interface team {
  id: string;
  name: string;
  teamLogo: string;
  players: [account];
}

export const useStore = defineStore("main", {
  state: () => ({
    User: {} as user,
    Leaderboard: [] as account[],
    Team: {} as team,
  }),
  getters: {
    getUserName(state) {
      return state.User.name;
    },
    getUserTeam(state) {
      return state.User.team;
    },
    getAllAcounts(state) {
      return state.User.accounts;
    },
  },
  actions: {
    async fetchProfile(player: string) {
      await axios
        .get("https://api.4esport.fr/lolpros/player/" + player)
        .then((res) => {
          this.User = res.data;
          console.log(this.User);
        })
        .catch((err) => console.log(err));
      console.log("User fetched !");
    },
    async fetchTeam(team: string) {
      await axios
        .get("https://api.4esport.fr/lolpros/team/" + team)
        .then((res) => {
          this.Team = res.data;
          console.log(this.Team);
        })
        .catch((err) => console.log(err));
      console.log("User fetched !");
    },
    async fetchLeaderboard() {
      await axios
        .get("https://api.4esport.fr/lolpros/leaderboard")
        .then((res) => {
          this.Leaderboard = res.data.response;
          console.log(this.Leaderboard);
        })
        .catch((err) => console.log(err));
      console.log("Leaderboard fetched !");
    },
    ToLowerWithoutFirst(s: string | undefined): string {
      return s ? s[0] + s.slice(1).toLocaleLowerCase() : "";
    },
    CLPtoObject(CLP: number) {
      let test = CLP
      let rank = "";
      let tier = "";
      if (CLP > 2400) {
        tier = "MASTER";
        rank="I"
        return {CLP:test,rank:rank,tier:tier,LP:CLP-2400}
        CLP -= 2400;
      } else if (CLP > 2000) {
        tier = "DIAMOND";
        CLP -= 2000;
      } else if (CLP > 1600) {
        tier = "PLATINUM";
        CLP -= 1600;
      } else if (CLP > 1200) {
        tier = "GOLD";
        CLP -= 1200;
      } else if (CLP > 800) {
        tier = "SILVER";
        CLP -= 800;
      } else if (CLP > 400) {
        tier = "BRONZE";
        CLP -= 400;
      } else {
        tier = "IRON";
      }
      if (CLP > 300) {
        rank = "I";
        CLP -= 300;
      } else if (CLP > 200) {
        rank = "II";
        CLP -= 200;
      } else if (CLP > 100) {
        rank = "III";
        CLP -= 100;
      } else {
        rank = "IV";
      }
      return {CLP:test,rank:rank,tier:tier,LP:CLP}
    },
  },
});
