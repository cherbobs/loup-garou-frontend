import { RoleKey } from "../player-roles.types";

export type PlayerRoleAssignment = {
  id: string;
  key: RoleKey;
  image: any;
  name: string;
  description: string;
};

const data: PlayerRoleAssignment[] = [
  {
    id: "1",
    key: "werewolf",
    image: require("../assets/role-card/werewolf-card.png"),
    name: "Loups-Garous",
    description:
      "Si, en piochant, tu découvres la carte Loup-Garou, félicitations : tu fais partie des quatre élus soit environ 17 % de chances. Dès lors, la ruse sera ton alliée : tu devras garder ton rôle secret à tout prix.",
  },
  {
    id: "2",
    key: "villager",
    image: require("../assets/role-card/villager-card.png"),
    name: "Villageois",
    description:
      "Si, en piochant, tu découvres la carte Loup-Garou, félicitations : tu fais partie des quatre élus soit environ 17 % de chances. Dès lors, la ruse sera ton alliée : tu devras garder ton rôle secret à tout prix.",
  },
  {
    id: "3",
    key: "witch",
    image: require("../assets/role-card/witch-card.png"),
    name: "la Sorcière",
    description:
      "Si, en piochant, tu découvres la carte Loup-Garou, félicitations : tu fais partie des quatre élus soit environ 17 % de chances. Dès lors, la ruse sera ton alliée : tu devras garder ton rôle secret à tout prix.",
  },
  {
    id: "4",
    key: "seer",
    image: require("../assets/role-card/seer-card.png"),
    name: "la Voyante",
    description:
      "Si, en piochant, tu découvres la carte Loup-Garou, félicitations : tu fais partie des quatre élus soit environ 17 % de chances. Dès lors, la ruse sera ton alliée : tu devras garder ton rôle secret à tout prix.",
  },
  {
    id: "5",
    key: "nurse",
    image: require("../assets/role-card/nurse-card.png"),
    name: "la Nourrice",
    description:
      "Si, en piochant, tu découvres la carte Loup-Garou, félicitations : tu fais partie des quatre élus soit environ 17 % de chances. Dès lors, la ruse sera ton alliée : tu devras garder ton rôle secret à tout prix.",
  },
];

export default data;
