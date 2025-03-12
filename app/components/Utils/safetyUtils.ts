import { TRICK_DATA } from "../Data/trickData";
import { TRICK_COMPONENTS } from "../Data/trickComponents";
import { StorageService } from "./StorageService";

export const shouldShowSafetyPopup = async (
  trickId: string
): Promise<{ shouldShow: boolean; reason: string }> => {
  //console.log(`[SAFETY] Checking for trick: ${trickId}`);

  // Get user info and safety preferences
  const userStats = await StorageService.getUserStats();
  const trickStates = await StorageService.getTrickStates();
  const safetyPrefs = await StorageService.getSafetyPopupPreferences();

  //console.log(`[SAFETY] User stats:`, userStats);
  //console.log(`[SAFETY] Safety prefs:`, safetyPrefs);
  //console.log(
  //  `[SAFETY] Completed tricks:`,
  //  Object.keys(trickStates).filter((key) => trickStates[key] === 2).length
  //);

  // Don't show if user has opted out
  if (safetyPrefs.dontShowAgain) {
    //console.log(`[SAFETY] User opted out of popups`);
    return { shouldShow: false, reason: "" };
  }

  // Check for frequency limiting
  const now = Date.now();
  const timeSinceLastShown = now - (safetyPrefs.lastShownTimestamp || 0);
  const MIN_TIME_BETWEEN_POPUPS = 900000;

  //console.log(`[SAFETY] Time since last popup: ${timeSinceLastShown}ms (min: ${MIN_TIME_BETWEEN_POPUPS}ms)`);

  if (timeSinceLastShown < MIN_TIME_BETWEEN_POPUPS) {
    //console.log(`[SAFETY] Too soon since last popup`);
    return { shouldShow: false, reason: "" };
  }

  // Find the current trick data
  const currentTrickComponent = TRICK_COMPONENTS.find((t) => t.id === trickId);
  const currentTrickData = TRICK_DATA.find((t) => t.id === trickId);

  if (!currentTrickComponent || !currentTrickData) {
    //console.log(`[SAFETY] Trick data missing`);
    return { shouldShow: false, reason: "" };
  }

  // Get user's highest completed tricks
  const completedTricks = Object.entries(trickStates)
    .filter(([_, state]) => state === 2)
    .map(([id]) => id);

  //console.log(`[SAFETY] Completed tricks:`, completedTricks);

  // User is a beginner, show warning for harder tricks
  if (completedTricks.length === 0) {
    //console.log(`[SAFETY] User is a beginner`);
    const currentTrickDifficulty = parseInt(currentTrickData.difficulty);
    //console.log(`[SAFETY] Trick difficulty: ${currentTrickDifficulty}`);

    if (currentTrickDifficulty > 3) {
      //console.log(`[SAFETY] SHOWING: beginner attempting hard trick`);
      return { shouldShow: true, reason: "beginner" };
    }

    //console.log(`[SAFETY] Not showing: easy trick for beginner`);
    return { shouldShow: false, reason: "" };
  }

  // Find highest difficulty and impact levels the user has mastered
  let highestCompletedDifficulty = 1;
  let highestCompletedImpact = 1;

  completedTricks.forEach((trickId) => {
    const component = TRICK_COMPONENTS.find((t) => t.id === trickId);
    const data = TRICK_DATA.find((t) => t.id === trickId);
    if (component && data) {
      const difficulty = parseInt(data.difficulty);
      if (difficulty > highestCompletedDifficulty) {
        highestCompletedDifficulty = difficulty;
      }
      if (component.impactLevel > highestCompletedImpact) {
        highestCompletedImpact = component.impactLevel;
      }
    }
  });

  const currentTrickDifficulty = parseInt(currentTrickData.difficulty);

  // Calculate difference between this trick and user's skill level
  const difficultyGap = currentTrickDifficulty - highestCompletedDifficulty;
  const impactGap = currentTrickComponent.impactLevel - highestCompletedImpact;

  //console.log(`[SAFETY] Difficulty gap: ${difficultyGap}`);
  //console.log(`[SAFETY] Impact gap: ${impactGap}`);

  // Age factor - younger users get more warnings
  const ageFactor = userStats.age < 16 ? 2 : userStats.age < 25 ? 1 : 0;
  //console.log(`[SAFETY] Age factor: ${ageFactor} (age: ${userStats.age})`);
  //console.log(`[SAFETY] Difficulty threshold: ${3 + ageFactor}`);

  // Show popup if difficulty gap is significant
  if (difficultyGap > 3 + ageFactor) {
    //console.log(`[SAFETY] SHOWING: high difficulty gap`);
    return { shouldShow: true, reason: "difficulty" };
  }

  // Show popup if impact level is significantly higher
  if (impactGap > 2) {
    //console.log(`[SAFETY] SHOWING: high impact gap`);
    return { shouldShow: true, reason: "impact" };
  }

  //console.log(`[SAFETY] Not showing: no safety concerns`);
  return { shouldShow: false, reason: "" };
};
