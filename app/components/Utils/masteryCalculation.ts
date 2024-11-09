import { TrickState } from "./StorageService";
import { TRICK_DATA } from "../Data/trickData";

export function calculateSkateboardMastery(trickStates: TrickState): number {
  const totalTricks = TRICK_DATA.length;

  const earnedPoints = Object.entries(trickStates).reduce(
    (total, [trickId, state]) => {
      if (state === 2) {
        return total + 1;
      }
      if (state === 1) {
        return total + 0.5;
      }
      return total;
    },
    0
  );

  const masteryPercentage = (earnedPoints / totalTricks) * 100;

  return Math.round(masteryPercentage);
}
