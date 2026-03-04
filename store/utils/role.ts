import { roleDistribution } from "../constants/roleDistribution";
import { RoleKey } from "../types";

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function generateRoles(playerCount: number): RoleKey[] {
  const distribution = roleDistribution[playerCount];

  if (!distribution) {
    throw new Error("Nombre de joueurs non supporté");
  }

  const roles: RoleKey[] = [];

  Object.entries(distribution).forEach(([role, count]) => {
    for (let i = 0; i < count; i++) {
      roles.push(role as RoleKey);
    }
  });

  return shuffleArray(roles);
}
