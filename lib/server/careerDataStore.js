import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { dataScienceSubdomains } from "../dataScienceSubdomains";

const csvFiles = {
  dataScienceJobs: "cleaned_DataScience_Jobs.csv",
  analyticsJobs: "cleaned_Analytics_Jobs.csv",
  juniorSkillTraits: "cleaned_JDS_Skill_Traits.csv",
  seniorPersonalityTraits: "cleaned_SDS_Personality_Traits.csv"
};

const juniorSkillColumns = {
  bigDataSkills: "big_data_skills",
  mathsStatsSkills: "maths_stats_skills",
  codingSkills: "coding_skills",
  aiAndMlSkills: "ai_and_ml_skills",
  dashboardAndStorytellingSkills: "dashboard_and_storytelling_skills"
};

const seniorTraitColumns = {
  neuroticism: "neuroticism",
  extraversion: "extraversion",
  opennessToExperience: "openness_to_experience",
  agreeableness: "agreeableness",
  conscientiousness: "conscientiousness"
};

let storePromise;

function parseNumber(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function round(value, digits = 2) {
  if (!Number.isFinite(value)) return null;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function mean(values) {
  const valid = values.filter(Number.isFinite);
  if (!valid.length) return null;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function quantile(sortedValues, fraction) {
  if (!sortedValues.length) return null;
  const position = (sortedValues.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sortedValues[lower];
  return sortedValues[lower] + (sortedValues[upper] - sortedValues[lower]) * (position - lower);
}

async function readCsv(filename, requiredColumns) {
  const csvPath = path.join(process.cwd(), filename);
  const contents = await readFile(csvPath, "utf8");
  const rows = parse(contents, {
    bom: true,
    columns: true,
    skip_empty_lines: true,
    trim: true,
    max_record_size: 1_000_000
  });

  if (!rows.length) throw new Error(`${filename} contains no data rows.`);
  const columns = new Set(Object.keys(rows[0]));
  const missingColumns = requiredColumns.filter((column) => !columns.has(column));
  if (missingColumns.length) {
    throw new Error(`${filename} is missing required columns: ${missingColumns.join(", ")}.`);
  }

  return rows;
}

function summarizeCompanySalary(rows) {
  const companies = new Map();
  const roles = new Map();

  for (const row of rows) {
    const company = row.company_name?.trim();
    const averageSalary = parseNumber(row.avg_salary);
    const postings = parseNumber(row.num_of_jobs);
    if (!company || averageSalary === null) continue;

    const aggregate = companies.get(company) ?? {
      company,
      postings: 0,
      weightedSalary: 0,
      minSalaryLpa: Number.POSITIVE_INFINITY,
      maxSalaryLpa: Number.NEGATIVE_INFINITY,
      roles: new Map()
    };
    const weight = postings !== null && postings > 0 ? postings : 1;
    aggregate.postings += weight;
    aggregate.weightedSalary += averageSalary * weight;

    const minSalary = parseNumber(row.min_salary);
    const maxSalary = parseNumber(row.max_salary);
    if (minSalary !== null) aggregate.minSalaryLpa = Math.min(aggregate.minSalaryLpa, minSalary);
    if (maxSalary !== null) aggregate.maxSalaryLpa = Math.max(aggregate.maxSalaryLpa, maxSalary);

    const title = row.job_title?.trim();
    if (title) {
      aggregate.roles.set(title, (aggregate.roles.get(title) ?? 0) + weight);
      const roleAggregate = roles.get(title) ?? {
        jobTitle: title,
        postings: 0,
        weightedSalary: 0,
        minSalaryLpa: Number.POSITIVE_INFINITY,
        maxSalaryLpa: Number.NEGATIVE_INFINITY
      };
      roleAggregate.postings += weight;
      roleAggregate.weightedSalary += averageSalary * weight;
      if (minSalary !== null) roleAggregate.minSalaryLpa = Math.min(roleAggregate.minSalaryLpa, minSalary);
      if (maxSalary !== null) roleAggregate.maxSalaryLpa = Math.max(roleAggregate.maxSalaryLpa, maxSalary);
      roles.set(title, roleAggregate);
    }
    companies.set(company, aggregate);
  }

  const rankedCompanies = [...companies.values()]
    .sort((a, b) => b.postings - a.postings)
    .map((company) => ({
      company: company.company,
      postings: company.postings,
      averageSalaryLpa: round(company.weightedSalary / company.postings),
      minSalaryLpa: Number.isFinite(company.minSalaryLpa) ? round(company.minSalaryLpa) : null,
      maxSalaryLpa: Number.isFinite(company.maxSalaryLpa) ? round(company.maxSalaryLpa) : null,
      topRoles: [...company.roles.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([title]) => title)
    }));

  const salaries = rows.map((row) => parseNumber(row.avg_salary)).filter(Number.isFinite);
  const postingCount = rows.reduce((total, row) => total + (parseNumber(row.num_of_jobs) ?? 0), 0);
  const roleSalaryBenchmarks = [...roles.values()]
    .sort((a, b) => b.postings - a.postings)
    .map((role) => ({
      jobTitle: role.jobTitle,
      postings: role.postings,
      averageSalaryLpa: round(role.weightedSalary / role.postings),
      minSalaryLpa: Number.isFinite(role.minSalaryLpa) ? round(role.minSalaryLpa) : null,
      maxSalaryLpa: Number.isFinite(role.maxSalaryLpa) ? round(role.maxSalaryLpa) : null
    }));

  return {
    source: csvFiles.dataScienceJobs,
    recordCount: rows.length,
    postingCount,
    companyCount: companies.size,
    averageSalaryLpa: round(mean(salaries)),
    medianSalaryLpa: round(median(salaries)),
    salaryRangeLpa: {
      min: salaries.length ? round(Math.min(...salaries)) : null,
      max: salaries.length ? round(Math.max(...salaries)) : null
    },
    companySalaryBanners: rankedCompanies.slice(0, 12),
    roleSalaryBenchmarks
  };
}

function splitSkills(value) {
  return [...new Set(
    String(value ?? "")
      .split(/[,;|]/)
      .map((skill) => skill.replace(/\.{2,}/g, "").trim())
      .filter((skill) => skill.length > 1 && !/^(n\/?a|not specified)$/i.test(skill))
  )];
}

function summarizeAnalyticsJobs(rows) {
  const skillCounts = new Map();
  const cityCounts = new Map();
  const titleCounts = new Map();
  const minExperience = [];
  const maxExperience = [];
  const salaries = [];

  for (const row of rows) {
    const title = row.job_desig?.trim();
    if (title) titleCounts.set(title, (titleCounts.get(title) ?? 0) + 1);
    for (const skill of splitSkills(row.key_skills)) {
      skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1);
    }
    const city = row.primary_city?.trim();
    if (city) cityCounts.set(city, (cityCounts.get(city) ?? 0) + 1);
    const minimum = parseNumber(row.min_experience);
    const maximum = parseNumber(row.max_experience);
    if (minimum !== null) minExperience.push(minimum);
    if (maximum !== null) maxExperience.push(maximum);
    const salary = parseNumber(row.mid_salary_lpa);
    if (salary !== null) salaries.push(salary);
  }

  const summary = {
    source: csvFiles.analyticsJobs,
    postingCount: rows.length,
    uniqueJobTitles: titleCounts.size,
    uniquePrimaryCities: cityCounts.size,
    commonSkills: [...skillCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([skill, postingCount]) => ({ skill, postingCount })),
    topLocations: [...cityCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([location, postingCount]) => ({ location, postingCount })),
    experienceRangeYears: {
      min: minExperience.length ? round(Math.min(...minExperience), 1) : null,
      max: maxExperience.length ? round(Math.max(...maxExperience), 1) : null,
      medianMinimum: round(median(minExperience), 1),
      medianMaximum: round(median(maxExperience), 1)
    },
    medianSalaryLpa: round(median(salaries)),
    subdomains: {}
  };

  for (const subdomain of dataScienceSubdomains) {
    const matchingRows = rows.filter((row) => {
      const title = String(row.job_desig ?? "").toLowerCase();
      return subdomain.titleKeywords.some((keyword) => title.includes(keyword));
    });
    const subdomainSkills = new Map();
    const subdomainCities = new Map();
    const subdomainTitles = new Map();
    const subdomainMinExperience = [];
    const subdomainMaxExperience = [];
    const subdomainSalaries = [];

    for (const row of matchingRows) {
      const title = row.job_desig?.trim();
      if (title) subdomainTitles.set(title, (subdomainTitles.get(title) ?? 0) + 1);
      for (const skill of splitSkills(row.key_skills)) {
        subdomainSkills.set(skill, (subdomainSkills.get(skill) ?? 0) + 1);
      }
      const city = row.primary_city?.trim();
      if (city) subdomainCities.set(city, (subdomainCities.get(city) ?? 0) + 1);
      const minimum = parseNumber(row.min_experience);
      const maximum = parseNumber(row.max_experience);
      if (minimum !== null) subdomainMinExperience.push(minimum);
      if (maximum !== null) subdomainMaxExperience.push(maximum);
      const salary = parseNumber(row.mid_salary_lpa);
      if (salary !== null) subdomainSalaries.push(salary);
    }

    summary.subdomains[subdomain.key] = {
      id: subdomain.id,
      title: subdomain.title,
      postingCount: matchingRows.length,
      commonSkills: [...subdomainSkills.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([skill, postingCount]) => ({ skill, postingCount })),
      topLocations: [...subdomainCities.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([location, postingCount]) => ({ location, postingCount })),
      topJobTitles: [...subdomainTitles.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([jobTitle, postingCount]) => ({ jobTitle, postingCount })),
      experienceRangeYears: {
        min: subdomainMinExperience.length ? round(Math.min(...subdomainMinExperience), 1) : null,
        max: subdomainMaxExperience.length ? round(Math.max(...subdomainMaxExperience), 1) : null
      },
      medianSalaryLpa: round(median(subdomainSalaries))
    };
  }

  return summary;
}

function summarizeJuniorTraits(rows) {
  const validRows = rows.map((row) => ({
    skillScores: Object.fromEntries(
      Object.entries(juniorSkillColumns).map(([key, column]) => [key, parseNumber(row[column])])
    ),
    highSalaryHike: row.salary_hike_high_or_low === "1"
      ? true
      : row.salary_hike_high_or_low === "0"
        ? false
        : null,
    compositeSkillScore: parseNumber(row.composite_skill_score)
  })).filter((row) =>
    row.compositeSkillScore !== null &&
    Object.values(row.skillScores).every((score) => score !== null) &&
    row.highSalaryHike !== null
  );
  const scores = validRows.map((row) => row.compositeSkillScore).sort((a, b) => a - b);
  const quartileEdges = [0.25, 0.5, 0.75].map((fraction) => quantile(scores, fraction));
  const scoreQuartiles = Array.from({ length: 4 }, (_, index) => {
    const members = validRows.filter((row) => {
      const score = row.compositeSkillScore;
      if (index === 0) return score <= quartileEdges[0];
      if (index === 1) return score > quartileEdges[0] && score <= quartileEdges[1];
      if (index === 2) return score > quartileEdges[1] && score <= quartileEdges[2];
      return score > quartileEdges[2];
    });
    const highHikeCount = members.filter((row) => row.highSalaryHike).length;
    return {
      label: `quartile${index + 1}`,
      sampleCount: members.length,
      minScore: members.length ? round(Math.min(...members.map((row) => row.compositeSkillScore)), 2) : null,
      maxScore: members.length ? round(Math.max(...members.map((row) => row.compositeSkillScore)), 2) : null,
      highSalaryHikeCount: highHikeCount,
      observedHighSalaryHikeRate: members.length ? round(highHikeCount / members.length, 4) : null
    };
  });

  return {
    source: csvFiles.juniorSkillTraits,
    sampleCount: validRows.length,
    scoreScale: { min: scores[0] ?? null, max: scores.at(-1) ?? null },
    compositeSkillScore: {
      mean: round(mean(scores)),
      median: round(median(scores)),
      percentileThresholds: {
        p25: round(quartileEdges[0]),
        p50: round(quartileEdges[1]),
        p75: round(quartileEdges[2])
      }
    },
    skillMeans: Object.fromEntries(
      Object.keys(juniorSkillColumns).map((key) => [
        key,
        round(mean(validRows.map((row) => row.skillScores[key])))
      ])
    ),
    highSalaryHikeLabel: "salary_hike_high_or_low",
    observedHighSalaryHikeRate: validRows.length
      ? round(validRows.filter((row) => row.highSalaryHike).length / validRows.length, 4)
      : null,
    cohortSalaryHikeHighProbabilityEstimateByScoreQuartile: scoreQuartiles.map((quartile) => ({
      ...quartile,
      cohortEstimate: quartile.observedHighSalaryHikeRate,
      interpretation: "Historical rate for this composite-score quartile; not an individual prediction."
    }))
  };
}

function summarizeSeniorTraits(rows) {
  const validRows = rows.map((row) => ({
    leadershipResilienceIndex: parseNumber(row.leadership_resilience_index),
    successClassification: row.success__classification__high_low === "1"
      ? "high"
      : row.success__classification__high_low === "0"
        ? "low"
        : null,
    traits: Object.fromEntries(
      Object.entries(seniorTraitColumns).map(([key, column]) => [key, parseNumber(row[column])])
    )
  })).filter((row) =>
    row.leadershipResilienceIndex !== null &&
    row.successClassification !== null &&
    Object.values(row.traits).every((value) => value !== null)
  );
  const indices = validRows
    .map((row) => row.leadershipResilienceIndex)
    .sort((a, b) => a - b);
  const successClassifications = ["high", "low"].map((classification) => {
    const members = validRows.filter((row) => row.successClassification === classification);
    const classIndices = members
      .map((row) => row.leadershipResilienceIndex)
      .sort((a, b) => a - b);

    return {
      classification,
      sampleCount: members.length,
      leadershipResilienceIndex: {
        mean: round(mean(classIndices)),
        median: round(median(classIndices))
      },
      oceanTraitMeans: Object.fromEntries(
        Object.keys(seniorTraitColumns).map((key) => [
          key,
          round(mean(members.map((row) => row.traits[key])))
        ])
      )
    };
  });

  return {
    source: csvFiles.seniorPersonalityTraits,
    sampleCount: validRows.length,
    intendedUse: "Aggregated cohort analytics only; not an individual candidate suitability or hiring score.",
    traitScale: { min: 0, max: 100 },
    oceanTraitMeans: Object.fromEntries(
      Object.keys(seniorTraitColumns).map((key) => [
        key,
        round(mean(validRows.map((row) => row.traits[key])))
      ])
    ),
    leadershipResilienceIndex: {
      mean: round(mean(indices)),
      median: round(median(indices)),
      min: indices[0] ?? null,
      max: indices.at(-1) ?? null,
      percentileThresholds: {
        p25: round(quantile(indices, 0.25)),
        p50: round(quantile(indices, 0.5)),
        p75: round(quantile(indices, 0.75))
      }
    },
    successClassification: {
      sourceColumn: "success__classification__high_low",
      encodedLabels: { "1": "high", "0": "low" },
      cohorts: successClassifications
    }
  };
}

async function loadCareerDataStore() {
  const [dataScienceJobs, analyticsJobs, juniorSkillTraits, seniorPersonalityTraits] =
    await Promise.all([
      readCsv(csvFiles.dataScienceJobs, [
        "company_name", "job_title", "avg_salary", "min_salary", "max_salary", "num_of_jobs"
      ]),
      readCsv(csvFiles.analyticsJobs, [
        "job_desig", "job_type", "key_skills", "location", "min_experience",
        "max_experience", "min_salary_lpa", "max_salary_lpa", "mid_salary_lpa", "primary_city"
      ]),
      readCsv(csvFiles.juniorSkillTraits, [
        ...Object.values(juniorSkillColumns),
        "salary_hike_high_or_low",
        "composite_skill_score"
      ]),
      readCsv(csvFiles.seniorPersonalityTraits, [
        ...Object.values(seniorTraitColumns),
        "leadership_resilience_index",
        "success__classification__high_low"
      ])
    ]);

  const analyticsRows = analyticsJobs.map((row) => ({
    jobTitle: row.job_desig,
    jobType: row.job_type,
    keySkills: splitSkills(row.key_skills),
    location: row.location,
    primaryCity: row.primary_city,
    experienceRangeYears: {
      min: parseNumber(row.min_experience),
      max: parseNumber(row.max_experience)
    },
    salaryRangeLpa: {
      min: parseNumber(row.min_salary_lpa),
      max: parseNumber(row.max_salary_lpa),
      midpoint: parseNumber(row.mid_salary_lpa)
    }
  }));

  return {
    datasets: Object.fromEntries(
      Object.entries(csvFiles).map(([key, filename]) => [key, { source: filename }])
    ),
    dataScienceJobs: summarizeCompanySalary(dataScienceJobs),
    analyticsJobs: summarizeAnalyticsJobs(analyticsJobs),
    juniorSkillTraits: summarizeJuniorTraits(juniorSkillTraits),
    seniorPersonalityTraits: summarizeSeniorTraits(seniorPersonalityTraits),
    analyticsRows
  };
}

export function getCareerDataStore() {
  if (!storePromise) storePromise = loadCareerDataStore();
  return storePromise;
}

export async function getCareerDataSummary() {
  const store = await getCareerDataStore();
  return {
    datasets: store.datasets,
    dataScienceJobs: store.dataScienceJobs,
    analyticsJobs: store.analyticsJobs,
    juniorSkillTraits: store.juniorSkillTraits,
    seniorPersonalityTraits: store.seniorPersonalityTraits
  };
}

export async function getAnalyticsJobPage({ page = 1, pageSize = 50, query = "" } = {}) {
  const store = await getCareerDataStore();
  const normalizedQuery = query.trim().toLowerCase();
  const matchingRows = normalizedQuery
    ? store.analyticsRows.filter((row) =>
      `${row.jobTitle} ${row.jobType} ${row.location} ${row.keySkills.join(" ")}`.toLowerCase().includes(normalizedQuery)
    )
    : store.analyticsRows;
  const total = matchingRows.length;
  const start = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    total,
    pageCount: Math.ceil(total / pageSize),
    jobs: matchingRows.slice(start, start + pageSize)
  };
}
