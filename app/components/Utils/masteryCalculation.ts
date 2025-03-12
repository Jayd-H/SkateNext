import { TrickState } from "./StorageService";
import { TRICK_DATA } from "../Data/trickData";

export function calculateSkateboardMastery(trickStates: TrickState): number {
  const includedTricks = TRICK_DATA.filter((trick) => {
    const difficulty = Number(trick.difficulty);
    return difficulty <= 10;
  });

  const totalTricks = includedTricks.length;

  const earnedPoints = Object.entries(trickStates).reduce(
    (total, [trickId, state]) => {
      const trick = includedTricks.find((t) => t.id === trickId);

      if (!trick) return total;

      if (state >= 1) {
        return total + 1;
      }

      return total;
    },
    0
  );

  const masteryPercentage = (earnedPoints / totalTricks) * 100;

  return Math.round(masteryPercentage);
}
