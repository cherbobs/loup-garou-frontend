// ./store/gameStore.ts
import { create } from "zustand";
import { Player, RoleKey, GamePhase } from "./types";
import { roleDistribution } from "./roleDistribution";

type GameState = {
  totalPlayers: number;
  players: Player[];
  phase: GamePhase;

  // Actions
  setTotalPlayers: (count: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  assignRoles: () => void;
  killPlayer: (id: string) => void;
  setPhase: (phase: GamePhase) => void;
  resetGame: () => void;
  setPlayerName: (index: number, name: string) => void;
  initPlayers: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  totalPlayers: 12,
  players: [],
  phase: "setup",

  setTotalPlayers: (count) => set({ totalPlayers: count }),
  initPlayers: () => {
    const total = get().totalPlayers;

    set({
      players: Array.from({ length: total }, (_, index) => ({
        id: index.toString(),
        name: "",
        status: "alive",
      })),
    });
  },

  setPlayerName: (index, name) =>
    set((state) => {
      const updated = [...state.players];
      updated[index] = {
        ...updated[index],
        name,
      };
      return { players: updated };
    }),
  addPlayer: (name) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: crypto.randomUUID(),
          name,
          status: "alive",
        },
      ],
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  assignRoles: () => {
    const players = get().players;
    const playerCount = players.length;

    const distribution = roleDistribution[playerCount];

    if (!distribution) {
      console.warn("Nombre de joueurs non supporté");
      return;
    }

    const rolesArray: RoleKey[] = [];

    (Object.keys(distribution) as RoleKey[]).forEach((role) => {
      for (let i = 0; i < distribution[role]; i++) {
        rolesArray.push(role);
      }
    });

    const shuffled = rolesArray.sort(() => Math.random() - 0.5);

    const updatedPlayers = players.map((player, index) => ({
      ...player,
      role: shuffled[index],
    }));

    set({
      players: updatedPlayers,
      phase: "night",
    });
  },

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
      phase: "setup",
    }),
}));
