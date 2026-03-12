// components/StepRenderer.tsx

import { useGameStore } from "../store/gameStore";

import WerewolvesBox from "./steps/WerewolvesBox";
import SeerBox from "./steps/SeerBox";
import { GameStep } from "../store/types";

const STEP_COMPONENTS: Partial<Record<Exclude<GameStep, null>, React.FC>> = {
  werewolves: WerewolvesBox,
  seer: SeerBox,
};

export default function StepRenderer() {
  const step = useGameStore((state) => state.step);
  console.log("Current step:", step);
  if (!step) return null;

  const StepComponent = STEP_COMPONENTS[step];
  console.log("Step component:", StepComponent);
  if (!StepComponent) return null;

  return <StepComponent />;
}
