export type RoleKey = "werewolf" | "villager" | "witch" | "seer" | "nurse";

export type PlayerStatus = "alive" | "dead";

export type Player = {
  id: string;
  name: string;
  role?: RoleKey;
  status: PlayerStatus;
};

export type GamePhase = "setup" | "night" | "day" | "ended";
