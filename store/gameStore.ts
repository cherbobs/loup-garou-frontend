// ./store/gameStore.ts
import { create } from "zustand";
import {
  Player,
  GamePhase,
  RoleKey,
  DayStep,
  NightStep,
  GameStep,
} from "./types";
import { generateRoles } from "./utils/role";

type GameState = {
  setTargetedPlayer: any;
  totalPlayers: number;
  players: Player[];
  shuffledRoles: RoleKey[];
  phase: GamePhase;
  step: GameStep;

  // Actions$
  prepareRoles: (playerCount: number) => void;
  setTotalPlayers: (count: number) => void;
  initPlayers: () => void;
  setPlayerName: (index: number, name: string) => void;
  killPlayer: (id: string) => void;
  setPhase: (phase: GamePhase) => void;
  resetGame: () => void;
  nextStep: () => void;
  startNight: () => void;
  startDay: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  step: "werewolves",
  totalPlayers: 12,
  players: [],
  shuffledRoles: [],
  phase: "setup",
  prepareRoles: (playerCount: number) => {
    const roles = generateRoles(playerCount);

    set(() => ({
      shuffledRoles: roles,
    }));
  },
  setTotalPlayers: (count) => set({ totalPlayers: count }),

  initPlayers: () => {
    const total = get().totalPlayers;

    const roles = generateRoles(total);

    set({
      players: Array.from({ length: total }, (_, index) => ({
        id: index.toString(),
        name: "",
        role: undefined,
        status: "alive",
        isTargetedByWerewolves: false,
      })),
      shuffledRoles: roles,
    });
  },

  setPlayerName: (index, name) =>
    set((state) => {
      const updated = [...state.players];

      updated[index] = {
        ...updated[index],
        name,
        role: state.shuffledRoles[index],
      };

      return { players: updated };
    }),

  killPlayer: (id) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, status: "dead" } : p
      ),
    })),

  setPhase: (phase) => set({ phase }),

  resetGame: () =>
    set({
      players: [],
      shuffledRoles: [],
      phase: "setup",
    }),
  startNight: () =>
    set({
      phase: "night",
      step: "werewolves",
    }),

  startDay: () =>
    set({
      phase: "day",
      step: "reveal",
    }),

  nextStep: () => {
    const { phase, step } = get();

    if (phase === "night") {
      const nightSteps: NightStep[] = ["werewolves", "seer", "witch", "nurse"];

      const index = nightSteps.indexOf(step as NightStep);

      if (index < nightSteps.length - 1) {
        set({ step: nightSteps[index + 1] });
      } else {
        get().startDay();
      }
    }

    if (phase === "day") {
      const daySteps: DayStep[] = [
        "reveal",
        "discussion",
        "vote",
        "elimination",
      ];

      const index = daySteps.indexOf(step as DayStep);

      if (index < daySteps.length - 1) {
        set({ step: daySteps[index + 1] });
      } else {
        get().startNight();
      }
    }
  },
  setTargetedPlayer: (id: string) =>
    set((state) => ({
      players: state.players.map((p) => ({
        ...p,
        isTargetedByWerewolves: p.id === id,
      })),
    })),

  savePlayer: (id: string) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, isTargetedByWerewolves: false } : p
      ),
    })),
}));
