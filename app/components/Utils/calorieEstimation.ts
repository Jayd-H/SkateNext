export interface UserStats {
  weight: number; // in kg
  age: number;
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Master";
}

interface CalorieSession {
  timestamp: number;
  duration: number; // in seconds
  caloriesBurned: number;
}

interface DailyCalorieLog {
  date: string; // YYYY-MM-DD
  sessions: CalorieSession[];
  totalCalories: number;
}

// this algorithm estimates calories burnt during skating sessions using multiple factors
// each factor is weighted differently to create an accurate metabolic equivalent (MET) value

// MET calculation factors and their weights
// base skating intensity:
// +casual skating (5.0 MET baseline)
// +moderate tricks (6.0 MET baseline)
// +intense technical (8.0 MET baseline)
// +competition level (9.0 MET baseline)

// skill level multipliers:
// +beginner (0.8x - learning basics, less efficient movement)
// +intermediate (1.0x - developing flow and technique)
// +advanced (1.2x - constant movement, technical combinations)
// +master (1.3x - maximum intensity and efficiency)

// age impact factors:
// +teen boost (1.2x - higher metabolism and recovery)
// +adult standard (1.0x - balanced metabolism)
// +mature adjustment (0.9x - accounting for recovery needs)

// trick proficiency factors:
// +known trick count (major)
// +average complexity (major)
// +average impact level (major)
// +mastered trick ratio (minor)
// *all modified by session duration

// final calorie calculation:
// calories = MET × weight × duration × age_factor
// where MET is adjusted based on all above factors
// duration is in hours
// weight is in kg

// MET values for different skating intensities
const SKATING_METS = {
  CASUAL: 5.0, // basic riding
  MODERATE: 6.0, // Basic tricks
  INTENSE: 8.0, // techy tricks
  EXTREME: 9.0, // insane tricks
} as {
  CASUAL: number;
  MODERATE: number;
  INTENSE: number;
  EXTREME: number;
};

const SKILL_MULTIPLIERS = {
  Beginner: 0.8,
  Intermediate: 1.0,
  Advanced: 1.2,
  Master: 1.3,
} as const;

// teens burn more calories, old ppl burn less
const getAgeFactor = (age: number): number => {
  if (age < 18) return 1.2;
  if (age > 40) return 0.9;
  return 1.0;
};

const calculateSkatingMET = (
  skillLevel: UserStats["skillLevel"],
  trickStates: { [key: string]: number },
  trickComponents: any[]
): number => {
  // 1. Calculate trick proficiency metrics
  const proficientTricks = Object.entries(trickStates).filter(
    ([_, state]) => state > 0
  ).length;
  const totalTricks = Object.keys(trickStates).length;
  const proficiencyRatio = proficientTricks / totalTricks;
  const masteredTricks = Object.entries(trickStates).filter(
    ([_, state]) => state === 2
  ).length;
  const masteryRatio = masteredTricks / totalTricks;

  // Get known tricks and calculate averages
  const knownTricks = trickComponents.filter(
    (trick) => trickStates[trick.id] > 0
  );
  const avgComplexity =
    knownTricks.reduce((sum, trick) => sum + trick.complexity, 0) /
    (knownTricks.length || 1);
  const avgImpact =
    knownTricks.reduce((sum, trick) => sum + trick.impactLevel, 0) /
    (knownTricks.length || 1);

  // 2. Determine base skating intensity based on complexity
  let baseMET = SKATING_METS.CASUAL;
  if (avgComplexity > 7) baseMET = SKATING_METS.EXTREME;
  else if (avgComplexity > 5) baseMET = SKATING_METS.INTENSE;
  else if (avgComplexity > 3) baseMET = SKATING_METS.MODERATE;

  // 3. Apply skill level multiplier
  const skillMultiplier = SKILL_MULTIPLIERS[skillLevel];

  // 4. Calculate trick proficiency factor
  // Known trick count influence (0.8-1.2 range)
  const knownTrickFactor = 0.8 + Math.min(proficiencyRatio, 1) * 0.4;

  // Impact level influence (0.9-1.3 range)
  const impactFactor = 0.9 + Math.min(avgImpact / 10, 1) * 0.4;

  // Mastery ratio influence (0.95-1.1 range, smaller effect)
  const masteryFactor = 0.95 + Math.min(masteryRatio, 1) * 0.15;

  // 5. Combine all factors to calculate final MET
  const trickProficiencyFactor =
    knownTrickFactor * 0.35 + impactFactor * 0.35 + masteryFactor * 0.3;

  // Final adjusted MET value
  const adjustedMET = baseMET * skillMultiplier * trickProficiencyFactor;

  return Number(adjustedMET.toFixed(1));
};

export const calculateSessionCalories = (
  duration: number,
  userStats: UserStats,
  trickStates: { [key: string]: number },
  trickComponents: any[]
): number => {
  const hours = duration / 3600;
  const MET = calculateSkatingMET(
    userStats.skillLevel,
    trickStates,
    trickComponents
  );
  const ageFactor = getAgeFactor(userStats.age);

  const calories = MET * userStats.weight * hours * ageFactor;

  return Math.round(calories);
};

// calorie stats for different time periods
export const getCalorieStats = async (logs: {
  [date: string]: DailyCalorieLog;
}) => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const todayLog = logs[today] || { totalCalories: 0 };

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);

  const weeklyCalories = Object.values(logs)
    .filter((log): log is DailyCalorieLog => {
      if (!log || !log.date) return false;
      return new Date(log.date) >= weekStart;
    })
    .reduce((sum, log) => sum + log.totalCalories, 0);

  const allTimeCalories = Object.values(logs)
    .filter(
      (log): log is DailyCalorieLog =>
        !!log && typeof log.totalCalories === "number"
    )
    .reduce((sum, log) => sum + log.totalCalories, 0);

  return {
    today: todayLog.totalCalories,
    weekly: weeklyCalories,
    allTime: allTimeCalories,
  };
};

export type { CalorieSession, DailyCalorieLog };
