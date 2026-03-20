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
      "Votre but est de dévorer tous les villageois. Chaque nuit, réveillez-vous en meute avec vos semblables pour désigner secrètement une victime. Le jour, fondez-vous dans la masse et mentez pour survivre.",
  },
  {
    id: "2",
    key: "villager",
    image: require("../assets/role-card/villager-card.png"),
    name: "Villageois",
    description:
      "Vous n'avez aucun pouvoir magique, mais votre arme, c'est votre voix. La nuit, vous dormez. Le jour, débattez, démasquez les menteurs et votez avec le village pour éliminer ceux que vous suspectez",
  },
  {
    id: "3",
    key: "witch",
    image: require("../assets/role-card/witch-card.png"),
    name: "la Sorcière",
    description:
      "Vous possédez deux puissants philtres utilisables une seule fois dans la partie. Pendant la nuit, vous pouvez choisir de ressusciter la victime des loups, ou bien d'éliminer le joueur de votre choix.",
  },
  {
    id: "4",
    key: "seer",
    image: require("../assets/role-card/seer-card.png"),
    name: "la Voyante",
    description:
      "Votre don de double vue est crucial. Chaque nuit, avant l'attaque des loups, le meneur de jeu vous révèle secrètement la véritable identité du joueur de votre choix. Utilisez ce savoir avec prudence.",
  },
  {
    id: "5",
    key: "nurse",
    image: require("../assets/role-card/nurse-card.png"),
    name: "la Nourrice",
    description:
      "Protectrice du village. Chaque nuit, vous choisissez un joueur pour veiller sur lui. S'il est attaqué par les loups-garous, il survit. Attention : vous ne pouvez pas protéger la même personne deux nuits de suite.",
  },
];

export default data;
