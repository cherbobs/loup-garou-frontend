// ./store/type.ts
export type RoleKey = "werewolf" | "villager" | "witch" | "seer" | "nurse";

export type PlayerStatus = "alive" | "dead";

export type Player = {
  id: string;
  name: string;
  role?: RoleKey;
  status: PlayerStatus;
  isTargetedByWerewolves: boolean;
};

export type GamePhase = "setup" | "night" | "day" | "ended";

export type NightStep = "werewolves" | "seer" | "witch" | "nurse";

export type DayStep = "reveal" | "discussion" | "vote" | "elimination";

export type GameStep = NightStep | DayStep | null;
