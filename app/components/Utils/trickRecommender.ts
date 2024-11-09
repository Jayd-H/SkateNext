import { TRICK_COMPONENTS, TrickComponents } from "../Data/trickComponents";
import { TrickState } from "./StorageService";

interface ScoredTrick {
  id: string;
  compositeScore: number;
  safetyScore: number;
  progressionScore: number;
  challengeScore: number;
  riskScore: number;
  familiarityScore: number;
}

// this algorithm is a bit hard to keep track of so there will be more comments than usual lol
// TODO: add functionality to weight recently completed tricks higher

// each trick gets a scored on 5 metrics: safety, progression, challenge, risk, familiarity
// each of these factors has its own score and is weighted differently to create the final composite score

// composite score factors weighting, ive not specified the exact weights as they may change as i tinker with it

// safety:
// +prerequisite strength (major)
// +similar trick experience (major)
// +trick family mastery (major)
// +lower complexity bonus (minor)
// +lower balance required bonus (minor)
// -vertical rotations (major penalty)
// -new footplant tricks (major penalty)

// progression:
// +prerequisite strength (major)
// +skill gap appropriateness (major)
// +trick family mastery (major)
// +stance progression (minor)
// +similar trick experience (major)
// +bonus if trick in progress (major)

// challenge:
// +trick complexity (major)
// +balance requirements (major)
// +stance progression (minor)
// +vertical rotation bonus (minor)
// +board rotation >180° bonus (minor)
// +flip count bonus (minor per flip)
// *all modified by prerequisite strength

// risk:
// +complexity (major)
// +impact level * age factor (major)
// +balance requirements (major)
// +non-regular stance (minor)
// +vertical rotation (minor)
// -reduced by prerequisite mastery (major)

// familiarity:
// +trick family mastery (major)
// +similar trick experience (major)
// +stance familiarity (major)

// final composite:
// +safety (major)
// +progression (major)
// +challenge (major)
// +inverted risk (minor)
// +familiarity (minor)
// *significant boost if trick is in progress

// there is an age impact factor that affects risk scores. 15 < age < 50 is the sweet spot. by default, it filters out tricks with risk scores > 0.7

// TODO: caching, batch processing, pre-filtering

export function getRecommendedTricks(
  trickStates: TrickState,
  userAge: number
): string[] {
  const calculateTrickScores = (trickId: string): ScoredTrick => {
    const trick = TRICK_COMPONENTS.find((t) => t.id === trickId);
    if (!trick) return createEmptyScore(trickId);

    const completionState = trickStates[trickId] || 0;
    if (completionState === 2) return createEmptyScore(trickId);

    const baseMetrics = calculateBaseMetrics(trick, trickStates, userAge);

    const safetyScore = calculateEnhancedSafetyScore(
      trick,
      trickStates,
      baseMetrics
    );
    const progressionScore = calculateProgressionScore(
      trick,
      trickStates,
      baseMetrics
    );
    const challengeScore = calculateEnhancedChallengeScore(
      trick,
      trickStates,
      baseMetrics
    );
    const riskScore = calculateRiskScore(trick, trickStates, userAge);
    const familiarityScore = calculateFamiliarityScore(trick, trickStates);

    const compositeScore = calculateCompositeScore({
      safetyScore,
      progressionScore,
      challengeScore,
      riskScore,
      familiarityScore,
      completionState,
    });

    return {
      id: trickId,
      compositeScore,
      safetyScore,
      progressionScore,
      challengeScore,
      riskScore,
      familiarityScore,
    };
  };

  // calculate scores for all tricks
  const scoredTricks = TRICK_COMPONENTS.map((trick) =>
    calculateTrickScores(trick.id)
  ).filter((trick) => trick.compositeScore > 0);

  // track selected tricks to ensure uniqueness
  const selectedTricks: string[] = [];
  const recommendations: string[] = [];

  // define selection criteria for each recommendation slot
  const selectionCriteria = [
    {
      metrics: ["safetyScore", "familiarityScore"],
      allowHigherRisk: false,
    },
    {
      metrics: ["progressionScore", "safetyScore"],
      allowHigherRisk: false,
    },
    {
      metrics: ["compositeScore"],
      allowHigherRisk: false,
    },
    {
      metrics: ["challengeScore", "familiarityScore"],
      allowHigherRisk: false,
    },
    {
      metrics: ["challengeScore"],
      allowHigherRisk: true,
    },
  ];

  // select tricks based on each criteria
  for (const criteria of selectionCriteria) {
    const remaining = scoredTricks.filter(
      (trick) => !selectedTricks.includes(trick.id)
    );

    const selected = selectByPriority(
      remaining,
      criteria.metrics,
      1,
      criteria.allowHigherRisk
    );

    if (selected.length > 0) {
      selectedTricks.push(selected[0].id);
      recommendations.push(selected[0].id);
    }
  }

  // fill any remaining slots with next best available tricks
  while (
    recommendations.length < 5 &&
    scoredTricks.length > selectedTricks.length
  ) {
    const remaining = scoredTricks.filter(
      (trick) => !selectedTricks.includes(trick.id)
    );

    const nextBest = remaining.sort(
      (a, b) => b.compositeScore - a.compositeScore
    )[0];

    if (nextBest) {
      selectedTricks.push(nextBest.id);
      recommendations.push(nextBest.id);
    } else {
      break;
    }
  }

  return recommendations;
}

function calculateBaseMetrics(
  trick: TrickComponents,
  trickStates: TrickState,
  userAge: number
) {
  return {
    stanceProgression: calculateStanceProgression(trick.stance, trickStates),
    trickFamilyMastery: calculateTrickFamilyMastery(
      trick.trickFamily,
      trickStates
    ),
    prerequisiteStrength: calculatePrerequisiteStrength(
      trick.prerequisiteIds,
      trickStates
    ),
    similarTrickExperience: calculateSimilarTrickExperience(
      trick.similarTricks,
      trickStates
    ),
    ageImpactFactor: calculateAgeImpactFactor(userAge, trick.impactLevel),
    skillGap: calculateSkillGap(trick, trickStates),
  };
}

function calculateStanceProgression(
  stance: string,
  trickStates: TrickState
): number {
  const stanceCounts = TRICK_COMPONENTS.reduce((counts, trick) => {
    if (trickStates[trick.id] === 2) {
      counts[trick.stance] = (counts[trick.stance] || 0) + 1;
    }
    return counts;
  }, {} as Record<string, number>);

  const currentStanceCount = stanceCounts[stance] || 0;
  const maxStanceCount = Math.max(...Object.values(stanceCounts));

  if (currentStanceCount < maxStanceCount * 0.3) return 1;
  if (currentStanceCount < maxStanceCount * 0.6) return 0.7;
  return 0.4;
}

function calculateTrickFamilyMastery(
  families: string[],
  trickStates: TrickState
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

function calculatePrerequisiteStrength(
  prerequisites: string[],
  trickStates: TrickState
): number {
  if (prerequisites.length === 0) return 1;

  return (
    prerequisites.reduce((score, preReqId) => {
      const state = trickStates[preReqId] || 0;
      return score + (state === 2 ? 1 : state === 1 ? 0.5 : 0);
    }, 0) / prerequisites.length
  );
}

function calculateSimilarTrickExperience(
  similarTricks: string[],
  trickStates: TrickState
): number {
  if (similarTricks.length === 0) return 1;

  return (
    similarTricks.reduce((score, trickId) => {
      const state = trickStates[trickId] || 0;
      return score + (state === 2 ? 1 : state === 1 ? 0.4 : 0);
    }, 0) / similarTricks.length
  );
}

function calculateAgeImpactFactor(age: number, impactLevel: number): number {
  if (age < 15) {
    return 1.2 - impactLevel * 0.08;
  }
  if (age > 50) {
    return 1.2 - impactLevel * 0.12;
  }
  return 1;
}

function calculateSkillGap(
  trick: TrickComponents,
  trickStates: TrickState
): number {
  const userHighestComplexity = TRICK_COMPONENTS.filter(
    (t) => trickStates[t.id] === 2
  ).reduce((max, t) => Math.max(max, t.complexity), 0);

  return normalizeScore((trick.complexity - userHighestComplexity) / 5);
}

function calculateEnhancedSafetyScore(
  trick: TrickComponents,
  trickStates: TrickState,
  baseMetrics: any
): number {
  let score = 0;

  score += baseMetrics.prerequisiteStrength * 0.3;
  score += baseMetrics.similarTrickExperience * 0.2;
  score += baseMetrics.trickFamilyMastery * 0.2;
  score += (10 - trick.complexity) * 0.02;
  score += (10 - trick.balanceRequired) * 0.01;

  if (trick.isVerticalRotation) score *= 0.8;

  if (trick.isFootplantTrick) {
    const hasFootplantExperience = TRICK_COMPONENTS.some(
      (t) => t.isFootplantTrick && (trickStates[t.id] || 0) > 0
    );
    if (!hasFootplantExperience) score *= 0.7;
  }

  return normalizeScore(score);
}

function calculateProgressionScore(
  trick: TrickComponents,
  trickStates: TrickState,
  baseMetrics: any
): number {
  let score = 0;

  score += baseMetrics.prerequisiteStrength * 0.25;
  score += (1 - baseMetrics.skillGap) * 0.2;
  score += baseMetrics.trickFamilyMastery * 0.2;
  score += baseMetrics.stanceProgression * 0.15;
  score += baseMetrics.similarTrickExperience * 0.2;

  if (trickStates[trick.id] === 1) score *= 1.3;

  return normalizeScore(score);
}

function calculateEnhancedChallengeScore(
  trick: TrickComponents,
  trickStates: TrickState,
  baseMetrics: any
): number {
  let score = 0;

  score += (trick.complexity / 10) * 0.3;
  score += (trick.balanceRequired / 10) * 0.2;
  score += baseMetrics.stanceProgression * 0.15;

  if (trick.isVerticalRotation) score += 0.1;
  if (trick.boardRotation > 180) score += 0.1;
  if (trick.flipCount > 0) score += trick.flipCount * 0.1;

  score *= Math.max(0.5, baseMetrics.prerequisiteStrength);

  return normalizeScore(score);
}

function calculateRiskScore(
  trick: TrickComponents,
  trickStates: TrickState,
  userAge: number
): number {
  let risk = 0;

  risk += (trick.complexity / 10) * 0.25;
  risk +=
    (trick.impactLevel / 10) *
    calculateAgeImpactFactor(userAge, trick.impactLevel) *
    0.25;
  risk += (trick.balanceRequired / 10) * 0.2;
  risk += (trick.stance === "regular" ? 0 : 0.15) * 0.15;

  if (trick.isVerticalRotation) risk += 0.15;

  risk *=
    1 - calculatePrerequisiteStrength(trick.prerequisiteIds, trickStates) * 0.3;

  return normalizeScore(risk);
}

function calculateFamiliarityScore(
  trick: TrickComponents,
  trickStates: TrickState
): number {
  let score = 0;

  const familyMastery = calculateTrickFamilyMastery(
    trick.trickFamily,
    trickStates
  );
  score += familyMastery * 0.35;

  const similarExperience = calculateSimilarTrickExperience(
    trick.similarTricks,
    trickStates
  );
  score += similarExperience * 0.35;

  const stanceFamiliarity =
    1 - calculateStanceProgression(trick.stance, trickStates);
  score += stanceFamiliarity * 0.3;

  return normalizeScore(score);
}

function calculateCompositeScore(scores: {
  safetyScore: number;
  progressionScore: number;
  challengeScore: number;
  riskScore: number;
  familiarityScore: number;
  completionState: number;
}): number {
  let composite = 0;

  composite += scores.safetyScore * 0.25;
  composite += scores.progressionScore * 0.3;
  composite += scores.challengeScore * 0.2;
  composite += (1 - scores.riskScore) * 0.15;
  composite += scores.familiarityScore * 0.1;

  if (scores.completionState === 1) {
    composite *= 1.2;
  }

  return normalizeScore(composite);
}

function createEmptyScore(trickId: string): ScoredTrick {
  return {
    id: trickId,
    compositeScore: 0,
    safetyScore: 0,
    progressionScore: 0,
    challengeScore: 0,
    riskScore: 0,
    familiarityScore: 0,
  };
}

function selectByPriority(
  tricks: ScoredTrick[],
  priorityMetrics: string[],
  count: number,
  allowHigherRisk: boolean = false
): ScoredTrick[] {
  const availableTricks = tricks.filter((t) =>
    !allowHigherRisk ? t.riskScore < 0.7 : true
  );

  return availableTricks
    .sort((a, b) => {
      for (const metric of priorityMetrics) {
        const diff = (b as any)[metric] - (a as any)[metric];
        if (diff !== 0) return diff;
      }
      return 0;
    })
    .slice(0, count);
}

function normalizeScore(score: number): number {
  return Math.max(0, Math.min(1, score));
}
