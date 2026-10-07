const readinessSkills = [
  "bigDataSkills",
  "mathsStatsSkills",
  "codingSkills",
  "aiAndMlSkills",
  "dashboardAndStorytellingSkills"
];

export function getGrowerCompanySalaryBanners(data) {
  return data?.dataScienceJobs?.companySalaryBanners ?? [];
}

export function getGrowerDemandMetrics(data) {
  const jobs = data?.dataScienceJobs;
  if (!jobs) return null;

  return {
    postingCount: jobs.postingCount,
    companyCount: jobs.companyCount,
    averageSalaryLpa: jobs.averageSalaryLpa,
    medianSalaryLpa: jobs.medianSalaryLpa,
    salaryRangeLpa: jobs.salaryRangeLpa
  };
}

export function calculateBuilderSkillReadiness(skillScores, juniorSkillTraits) {
  if (!skillScores || !juniorSkillTraits?.compositeSkillScore) return null;
  const entries = readinessSkills.map((key) => [key, Number(skillScores[key])]);
  if (entries.some(([, value]) => !Number.isFinite(value) || value < 0 || value > 5)) return null;

  const compositeSkillScore = entries.reduce((sum, [, score]) => sum + score, 0) / entries.length;
  const percentiles = juniorSkillTraits.compositeSkillScore.percentileThresholds;
  const quartileIndex = compositeSkillScore <= percentiles.p25
    ? 0
    : compositeSkillScore <= percentiles.p50
      ? 1
      : compositeSkillScore <= percentiles.p75
        ? 2
        : 3;
  const quartile = juniorSkillTraits.cohortSalaryHikeHighProbabilityEstimateByScoreQuartile[quartileIndex];
  const skillGapsVsCohort = Object.fromEntries(
    entries.map(([key, value]) => [key, Number((value - juniorSkillTraits.skillMeans[key]).toFixed(2))])
  );

  return {
    compositeSkillScore: Number(compositeSkillScore.toFixed(2)),
    cohortMeanCompositeSkillScore: juniorSkillTraits.compositeSkillScore.mean,
    estimatedScoreQuartile: quartileIndex + 1,
    skillGapsVsCohort,
    cohortSalaryHikeHighProbabilityEstimate: quartile?.cohortEstimate ?? null,
    salaryHikeEstimateIsHistoricalCohortData: true,
    salaryHikeEstimateIsAnIndividualPrediction: false,
    source: juniorSkillTraits.source
  };
}

export function getEnterpriseLeadershipAnalytics(data) {
  const analytics = data?.seniorPersonalityTraits;
  if (!analytics) return null;

  return {
    sampleCount: analytics.sampleCount,
    oceanTraitMeans: analytics.oceanTraitMeans,
    leadershipResilienceIndex: analytics.leadershipResilienceIndex,
    successClassification: analytics.successClassification,
    intendedUse: analytics.intendedUse,
    source: analytics.source
  };
}
