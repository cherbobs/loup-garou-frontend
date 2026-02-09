import { RoleKey } from "./player-roles.types";

export type PlayerRole = {
  id: string;
  key: RoleKey;
  image: any;
  name: string;
};

const data: PlayerRole[] = [
  {
    id: "1",
    key: "werewolf",
    image: require("./assets/role-assignement/werewolf-role.png"),
    name: "Loups-Garous",
  },
  {
    id: "2",
    key: "villager",
    image: require("./assets/role-assignement/villager-role.png"),
    name: "Villageois",
  },
  {
    id: "3",
    key: "witch",
    image: require("./assets/role-assignement/witch-role.png"),
    name: "Sorcière",
  },
  {
    id: "4",
    key: "seer",
    image: require("./assets/role-assignement/fortune-teller-role.png"),
    name: "Voyante",
  },
  {
    id: "5",
    key: "nurse",
    image: require("./assets/role-assignement/nurse-role.png"),
    name: "Nourrice",
  },
];

export default data;
