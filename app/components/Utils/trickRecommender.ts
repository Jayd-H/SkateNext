import { TRICK_COMPONENTS, TrickComponents } from "../Data/trickComponents";
import { StorageService } from "./StorageService";

// Trick Recommendation Scoring System

// Base Difficulty Score (30% of final)
// +complexity (major)
// +balance required (major)
// +impact level (major)
// -vertical rotation penalty (minor)
// -footplant complexity (minor)
// +flip count bonus (minor)

// Progression Score (40% of final)
// +prerequisite mastery (major)
// +trick family experience (major)
// +stance familiarity (minor)
// +currently in progress bonus (major +50%)
// -penalty for too many in-progress tricks (moderate)

// Familiarity Score (30% of final)
// +similar trick experience (major)
// +stance mastery (major)
// +trick family mastery (major)
// +recent practice bonus (minor +10%)

// Risk Modifiers (reduces final score)
// -high impact with age factor (major)
// -high complexity without prerequisites (major)
// -vertical rotation without experience (major)
// -unfamiliar stance (minor)
// +prerequisite strength bonus (reduces penalties)

// Progression Gates
// - Requires ollie >= 1 for tricks above complexity 3
// - Requires kickflip >= 1 for tricks above complexity 7

interface ScoredTrick {
  id: string;
  finalScore: number;
  baseDifficulty: number;
  progression: number;
  familiarity: number;
  riskMultiplier: number;
}

interface SlotPriority {
  safety: number;
  progression: number;
  challenge: number;
  familiarity: number;
}

interface RecentTrickUpdate {
  trickId: string;
  timestamp: number;
}

const SLOT_PRIORITIES: SlotPriority[] = [
  { safety: 0.1, progression: 0.1, challenge: 0.6, familiarity: 0.2 },
  { safety: 0.1, progression: 0.2, challenge: 0.5, familiarity: 0.2 },
  { safety: 0.2, progression: 0.3, challenge: 0.3, familiarity: 0.2 },
  { safety: 0.3, progression: 0.4, challenge: 0.2, familiarity: 0.1 },
  { safety: 0.4, progression: 0.4, challenge: 0.1, familiarity: 0.1 },
];

const memoizedScores = new Map<string, any>();

function isNoComplyTrick(trick: TrickComponents): boolean {
  const trickId = trick.id.toLowerCase();

  if (trickId.includes("nc")) {
    return true;
  } else {
    return false;
  }
}

export async function getRecommendedTricks(
  trickStates: Record<string, number>,
  userAge: number
): Promise<string[]> {
  memoizedScores.clear();
  const ollieLevel = trickStates["ollie"] || 0;
  const kickflipLevel = trickStates["kickflip"] || 0;
  const inProgressTricks = TRICK_COMPONENTS.filter(
    (trick) => trickStates[trick.id] === 1
  );
  let availableTricks = TRICK_COMPONENTS.filter((trick) => {
    if (!trickStates[trick.id] || trickStates[trick.id] < 2) {
      if (ollieLevel < 1 && trick.complexity > 3) return false;
      if (kickflipLevel < 1 && trick.complexity > 7) return false;
      return true;
    }
    return false;
  });
  const recommendations: string[] = [];
  const recentTricks = await StorageService.getRecentTrickUpdates();
  for (
    let i = 0;
    i < SLOT_PRIORITIES.length && availableTricks.length > 0;
    i++
  ) {
    const weights = SLOT_PRIORITIES[i];
    const scoredTricks = availableTricks.map((trick) => {
      const baseScore = calculateTrickScore(
        trick,
        trickStates,
        userAge,
        weights
      );
      const recentBonus = getRecentTrickBonus(trick.id, recentTricks);
      const finalScore = baseScore.finalScore + recentBonus;
      return {
        ...baseScore,
        finalScore,
      };
    });
    const selected = selectBestTrick(scoredTricks, recommendations);
    if (selected) {
      recommendations.push(selected);
      availableTricks = availableTricks.filter((t) => t.id !== selected);
    }
  }
  return recommendations;
}

function getRecentTrickBonus(
  trickId: string,
  recentTricks: RecentTrickUpdate[]
): number {
  const recentTrick = recentTricks.find((t) => t.trickId === trickId);
  if (!recentTrick) return 0;
  const daysSinceUpdate =
    (Date.now() - recentTrick.timestamp) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 7) return 0.05;
  return 0;
}

function calculateTrickScore(
  trick: TrickComponents,
  trickStates: Record<string, number>,
  userAge: number,
  weights: SlotPriority
): ScoredTrick {
  const baseDifficulty = calculateBaseDifficulty(trick);
  const progression = calculateProgression(trick, trickStates);
  const familiarity = calculateFamiliarity(trick, trickStates);
  const riskMultiplier = calculateRiskMultiplier(trick, trickStates, userAge);

  let finalScore = normalizeScore(
    baseDifficulty * weights.safety +
      progression * weights.progression +
      familiarity * weights.familiarity +
      riskMultiplier * 0.2
  );

  if (isNoComplyTrick(trick)) {
    finalScore *= 0.2;
  }

  return {
    id: trick.id,
    finalScore,
    baseDifficulty,
    progression,
    familiarity,
    riskMultiplier,
  };
}

function selectBestTrick(
  scoredTricks: ScoredTrick[],
  existing: string[]
): string | null {
  const available = scoredTricks
    .filter((trick) => !existing.includes(trick.id))
    .sort((a, b) => b.finalScore - a.finalScore);
  return available.length > 0 ? available[0].id : null;
}

function getMemoized(key: string, calculator: () => number): number {
  if (!memoizedScores.has(key)) {
    memoizedScores.set(key, calculator());
  }
  return memoizedScores.get(key);
}

function calculateBaseDifficulty(trick: TrickComponents): number {
  const memoKey = `base_${trick.id}`;
  return getMemoized(memoKey, () => {
    let score = 0;
    const complexityPenalty = Math.pow(trick.complexity / 10, 1.5);
    score += (1 - complexityPenalty) * 0.4;
    score += (trick.balanceRequired / 10) * 0.3;
    score += (trick.impactLevel / 10) * 0.3;
    if (trick.isVerticalRotation) score *= 0.8;
    if (trick.isFootplantTrick) score *= 0.9;
    if (trick.flipCount > 0) score *= 0.9;
    return normalizeScore(score);
  });
}

function calculateProgression(
  trick: TrickComponents,
  trickStates: Record<string, number>
): number {
  const memoKey = `prog_${trick.id}`;
  return getMemoized(memoKey, () => {
    let score = 0;
    const inProgressCount = Object.values(trickStates).filter(
      (state) => state === 1
    ).length;
    const currentStatus = trickStates[trick.id] || 0;
    const prereqStrength = calculatePrerequisiteStrength(
      trick.prerequisiteIds,
      trickStates
    );
    const familyExp = calculateFamilyExperience(trick.trickFamily, trickStates);
    const stanceFam = calculateStanceFamiliarity(trick.stance, trickStates);
    score += prereqStrength * 0.4;
    score += familyExp * 0.3;
    score += stanceFam * 0.2;
    if (currentStatus === 1) {
      if (trick.complexity <= 5) {
        score *= 1.1;
      } else {
        score *= 0.9;
      }
    }
    if (currentStatus === 0 && prereqStrength > 0.7) {
      const difficultyFactor = 1 - trick.complexity / 10;
      score *= 1 + difficultyFactor;
    }
    if (inProgressCount > 3) {
      score *= Math.max(0.5, 1 - (inProgressCount - 4) * 0.2);
    }
    return normalizeScore(score);
  });
}

function calculateFamiliarity(
  trick: TrickComponents,
  trickStates: Record<string, number>
): number {
  const memoKey = `fam_${trick.id}`;
  return getMemoized(memoKey, () => {
    let score = 0;
    const similarExp = calculateSimilarTrickExperience(
      trick.similarTricks,
      trickStates
    );
    score += similarExp * 0.5;
    const stanceMastery =
      1 - calculateStanceProgression(trick.stance, trickStates);
    score += stanceMastery * 0.5;
    return normalizeScore(score);
  });
}

function calculateRiskMultiplier(
  trick: TrickComponents,
  trickStates: Record<string, number>,
  userAge: number
): number {
  const memoKey = `risk_${trick.id}_${userAge}`;
  return getMemoized(memoKey, () => {
    let riskFactor = 1;
    const ageRisk = calculateAgeRiskFactor(userAge);
    riskFactor *= ageRisk;
    if (trick.impactLevel > 7) riskFactor *= 0.8;
    if (trick.complexity > 8) riskFactor *= 0.9;
    if (trick.isVerticalRotation) riskFactor *= 0.85;
    const prereqStrength = calculatePrerequisiteStrength(
      trick.prerequisiteIds,
      trickStates
    );
    riskFactor *= 0.7 + prereqStrength * 0.3;
    return normalizeScore(riskFactor);
  });
}

function calculatePrerequisiteStrength(
  prerequisites: string[],
  trickStates: Record<string, number>
): number {
  if (prerequisites.length === 0) return 1;
  return (
    prerequisites.reduce((score, preReqId) => {
      const state = trickStates[preReqId] || 0;
      return score + (state === 2 ? 1 : state === 1 ? 0.5 : 0);
    }, 0) / prerequisites.length
  );
}

function calculateFamilyExperience(
  families: string[],
  trickStates: Record<string, number>
): number {
  const familyScores = families.map((family) => {
    const familyTricks = TRICK_COMPONENTS.filter((t) =>
      t.trickFamily.includes(family)
    );
    const masteredCount = familyTricks.filter(
      (t) => trickStates[t.id] === 2
    ).length;
    return masteredCount / familyTricks.length;
  });
  return Math.max(...familyScores);
}

function calculateStanceFamiliarity(
  stance: string,
  trickStates: Record<string, number>
): number {
  const stanceTricks = TRICK_COMPONENTS.filter((t) => t.stance === stance);
  const masteredCount = stanceTricks.filter(
    (t) => trickStates[t.id] === 2
  ).length;
  return masteredCount / stanceTricks.length;
}

function calculateSimilarTrickExperience(
  similarTricks: string[],
  trickStates: Record<string, number>
): number {
  if (similarTricks.length === 0) return 1;
  return (
    similarTricks.reduce((score, trickId) => {
      const state = trickStates[trickId] || 0;
      return score + (state === 2 ? 1 : state === 1 ? 0.25 : 0.4);
    }, 0) / similarTricks.length
  );
}

function calculateStanceProgression(
  stance: string,
  trickStates: Record<string, number>
): number {
  const stanceCounts = TRICK_COMPONENTS.reduce((counts, trick) => {
    if (trickStates[trick.id] === 2) {
      counts[trick.stance] = (counts[trick.stance] || 0) + 1;
    }
    return counts;
  }, {} as Record<string, number>);
  const currentCount = stanceCounts[stance] || 0;
  const maxCount = Math.max(...Object.values(stanceCounts), 0);
  if (currentCount < maxCount * 0.3) return 1;
  if (currentCount < maxCount * 0.6) return 0.7;
  return 0.4;
}

function calculateAgeRiskFactor(age: number): number {
  if (age < 15) return 0.8;
  if (age > 50) return 0.7;
  return 1;
}

function normalizeScore(score: number): number {
  return Math.max(0, Math.min(1, score));
}
