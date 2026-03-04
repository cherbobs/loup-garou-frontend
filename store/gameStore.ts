// ./store/gameStore.ts
import { create } from "zustand";
import { Player, GamePhase, RoleKey } from "./types";
import { generateRoles } from "./utils/role";

type GameState = {
  totalPlayers: number;
  players: Player[];
  shuffledRoles: RoleKey[];
  phase: GamePhase;

  // Actions$
  prepareRoles: (playerCount: number) => void;
  setTotalPlayers: (count: number) => void;
  initPlayers: () => void;
  setPlayerName: (index: number, name: string) => void;
  killPlayer: (id: string) => void;
  setPhase: (phase: GamePhase) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
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
}));
