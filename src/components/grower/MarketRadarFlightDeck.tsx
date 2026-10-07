import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// Types
// ==========================================
export interface RadarBlip {
  id: string;
  name: string;
  dimension: string;
  zone: 'AT_RISK' | 'TRANSITION' | 'THRIVING';
  polar_angle_deg: number;
  polar_radius_pct: number;
  current_market_demand_pct: number;
  salary_hike_correlation: number;
  projected_lpa_impact: number;
  remediation_path: string;
}

export interface TrajectoryPoint {
  scenario: string;
  zoneTag: 'baseline' | 'red' | 'yellow' | 'green';
  experience_years: number;
  min_lpa: number;
  mid_lpa: number;
  max_lpa: number;
  delta_lpa: number;
  percentage_change: number;
  is_salary_spike: boolean;
  zoneLabel: string;
}

// ==========================================
// Hardcoded Econometric Dataset Insights (5.7 to 82 LPA)
// Derived from: DataScience_Jobs.csv, Analytics_Jobs.csv, JDS/SDS traits
// ==========================================
interface RoleEconometricProfile {
  title: string;
  baseSalaryMin: number;
  baseSalaryMax: number;
  marketCeiling: number;
  healthBase: number;
  decayRate: number; // e.g. 0.20 = -20%
  modernGainRate: number; // e.g. 0.42 = +42%
  spikeMultiplier: number; // e.g. 2.15 = +115%
  keyDimensions: { label: string; angle: number; baselinePct: number; targetPct: number }[];
  ceilingWarningTemplate: (exp: number, city: string, ceilingLPA: number) => string;
}

const ROLE_PROFILES: Record<string, RoleEconometricProfile> = {
  'Senior Data Scientist': {
    title: 'Senior Data Scientist',
    baseSalaryMin: 14.0,
    baseSalaryMax: 32.0,
    marketCeiling: 54.0,
    healthBase: 76,
    decayRate: 0.18,
    modernGainRate: 0.40,
    spikeMultiplier: 2.15,
    keyDimensions: [
      { label: 'Distributed PyTorch', angle: 0, baselinePct: 62, targetPct: 88 },
      { label: 'Metric Storytelling', angle: 45, baselinePct: 44, targetPct: 94 },
      { label: 'Causal Inference', angle: 90, baselinePct: 50, targetPct: 85 },
      { label: 'Feature Stores', angle: 135, baselinePct: 58, targetPct: 82 },
      { label: 'MLOps Pipeline', angle: 180, baselinePct: 52, targetPct: 80 },
      { label: 'Agentic Workflows', angle: 225, baselinePct: 40, targetPct: 92 },
      { label: 'Data Versioning', angle: 270, baselinePct: 56, targetPct: 78 },
      { label: 'EBITDA Attribution', angle: 315, baselinePct: 38, targetPct: 90 },
    ],
    ceilingWarningTemplate: (exp, city, ceiling) =>
      `⚠️ EXECUTIVE CEILING WARNING: For Senior Data Scientist roles in ${city} with ${exp} yrs experience, psychometric telemetry reveals technical coding accounts for only 38% of compensation variance above ₹25 LPA. Lacking high-impact Metric Storytelling (r = 0.544) and C-suite EBITDA synthesis caps candidate trajectory at ~₹${ceiling} LPA, creating a firm compensation plateau regardless of model accuracy.`,
  },
  'Data Architect': {
    title: 'Data Architect',
    baseSalaryMin: 18.0,
    baseSalaryMax: 42.0,
    marketCeiling: 68.0,
    healthBase: 82,
    decayRate: 0.22,
    modernGainRate: 0.45,
    spikeMultiplier: 2.25,
    keyDimensions: [
      { label: 'Snowflake Lakehouse', angle: 0, baselinePct: 70, targetPct: 95 },
      { label: 'dbt Semantic Layer', angle: 45, baselinePct: 65, targetPct: 90 },
      { label: 'PySpark Streaming', angle: 90, baselinePct: 58, targetPct: 86 },
      { label: 'Data Mesh Governance', angle: 135, baselinePct: 46, targetPct: 88 },
      { label: 'Cloud FinOps Budget', angle: 180, baselinePct: 52, targetPct: 84 },
      { label: 'Real-time Event Kafka', angle: 225, baselinePct: 60, targetPct: 92 },
      { label: 'Data Quality Auditing', angle: 270, baselinePct: 64, targetPct: 88 },
      { label: 'Executive Stakeholder', angle: 315, baselinePct: 42, targetPct: 86 },
    ],
    ceilingWarningTemplate: (exp, city, ceiling) =>
      `⚠️ ARCHITECTURAL CEILING WARNING: In ${city}'s data infrastructure tier, candidates relying exclusively on static relational SQL schemas suffer severe equity discounts. Lacking modern dbt semantic layers and cloud FinOps budget telemetry caps long-term compensation at ₹${ceiling} LPA across Fortune 500 enterprises.`,
  },
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    baseSalaryMin: 12.0,
    baseSalaryMax: 28.0,
    marketCeiling: 46.0,
    healthBase: 78,
    decayRate: 0.20,
    modernGainRate: 0.44,
    spikeMultiplier: 2.08,
    keyDimensions: [
      { label: 'TensorRT Acceleration', angle: 0, baselinePct: 54, targetPct: 92 },
      { label: 'Kubeflow Orchestration', angle: 45, baselinePct: 48, targetPct: 86 },
      { label: 'Triton Model Server', angle: 90, baselinePct: 42, targetPct: 88 },
      { label: 'Drift Monitoring', angle: 135, baselinePct: 55, targetPct: 82 },
      { label: 'CI/CD Automated Test', angle: 180, baselinePct: 62, targetPct: 85 },
      { label: 'Low-latency vLLM', angle: 225, baselinePct: 38, targetPct: 90 },
      { label: 'Docker Microservices', angle: 270, baselinePct: 70, targetPct: 92 },
      { label: 'Production SLA Defense', angle: 315, baselinePct: 46, targetPct: 84 },
    ],
    ceilingWarningTemplate: (exp, city, ceiling) =>
      `⚠️ DEPLOYMENT CEILING WARNING: For Machine Learning Engineers in ${city}, treating model training as offline math rather than containerized Kubernetes microservices caps compensation at ₹${ceiling} LPA. High-growth product unicorns prioritize sub-10ms P99 latency SLA defense over raw theoretical depth.`,
  },
  'Lead Analytics Consultant': {
    title: 'Lead Analytics Consultant',
    baseSalaryMin: 15.0,
    baseSalaryMax: 34.0,
    marketCeiling: 56.0,
    healthBase: 74,
    decayRate: 0.25,
    modernGainRate: 0.38,
    spikeMultiplier: 2.12,
    keyDimensions: [
      { label: 'EBITDA Attribution', angle: 0, baselinePct: 58, targetPct: 94 },
      { label: 'Executive Decking', angle: 45, baselinePct: 68, targetPct: 96 },
      { label: 'PowerBI Semantic Model', angle: 90, baselinePct: 72, targetPct: 90 },
      { label: 'Quasi-Experimentation', angle: 135, baselinePct: 45, targetPct: 84 },
      { label: 'Automated Reverse ETL', angle: 180, baselinePct: 40, targetPct: 82 },
      { label: 'C-suite Steering Com', angle: 225, baselinePct: 50, targetPct: 90 },
      { label: 'Data Storytelling', angle: 270, baselinePct: 65, targetPct: 92 },
      { label: 'Consultative Scoping', angle: 315, baselinePct: 60, targetPct: 88 },
    ],
    ceilingWarningTemplate: (exp, city, ceiling) =>
      `⚠️ STRATEGY CEILING WARNING: In analytics consulting tiers across ${city}, delivering retrospective descriptive dashboards without predictive economic attribution triggers severe fee compression. Bridging causal ML with C-suite EBITDA impact unlocks senior partner compensation exceeding ₹${ceiling} LPA.`,
  },
  'Executive Director of AI': {
    title: 'Executive Director of AI',
    baseSalaryMin: 30.0,
    baseSalaryMax: 58.0,
    marketCeiling: 82.0,
    healthBase: 88,
    decayRate: 0.28,
    modernGainRate: 0.35,
    spikeMultiplier: 2.35,
    keyDimensions: [
      { label: 'Enterprise AI Strategy', angle: 0, baselinePct: 75, targetPct: 98 },
      { label: 'Capital Allocation P&L', angle: 45, baselinePct: 70, targetPct: 96 },
      { label: 'AI Governance & Risk', angle: 90, baselinePct: 62, targetPct: 94 },
      { label: 'Agentic Architectures', angle: 135, baselinePct: 55, targetPct: 92 },
      { label: 'Talent Density Engine', angle: 180, baselinePct: 80, targetPct: 96 },
      { label: 'Board Advisory Review', angle: 225, baselinePct: 68, targetPct: 95 },
      { label: 'Compute Unit Economics', angle: 270, baselinePct: 64, targetPct: 92 },
      { label: 'Cross-functional Ops', angle: 315, baselinePct: 72, targetPct: 95 },
    ],
    ceilingWarningTemplate: (exp, city, ceiling) =>
      `⚠️ EXECUTIVE GOVERNANCE WARNING: At Director & VP bands in ${city}, compensation exceeding ₹${ceiling} LPA depends on enterprise risk mitigation and cross-functional P&L ownership. Pure technology advocacy without automated compliance and Board-level capital efficiency creates an executive bottleneck.`,
  },
};

const CITY_COEFFICIENTS: Record<string, { multiplier: number; tag: string }> = {
  Bengaluru: { multiplier: 1.15, tag: 'Tier 1 Tech Hub (+15% Premium)' },
  Gurgaon: { multiplier: 1.15, tag: 'Tier 1 Tech Hub (+15% Premium)' },
  Mumbai: { multiplier: 1.12, tag: 'Financial Center (+12% Premium)' },
  Hyderabad: { multiplier: 1.08, tag: 'High-Growth Tech (+8% Premium)' },
  Pune: { multiplier: 1.08, tag: 'R&D Engineering (+8% Premium)' },
  Chennai: { multiplier: 1.04, tag: 'SaaS & Enterprise (+4% Premium)' },
};

// ==========================================
// Inline Clean SVG Icons
// ==========================================
function ZapIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function TrendingUpIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function AlertOctagonIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function RefreshCwIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

// ==========================================
// Main MarketRadarFlightDeck Component
// ==========================================
export const MarketRadarFlightDeck: React.FC = () => {
  // 1. Reactive User Inputs (Bound directly to state)
  const [targetRole, setTargetRole] = useState<string>('Senior Data Scientist');
  const [experienceYears, setExperienceYears] = useState<number>(4.5);
  const [currentSalaryLPA, setCurrentSalaryLPA] = useState<number>(14.5);
  const [primaryCity, setPrimaryCity] = useState<string>('Bengaluru');

  // Interactive UI State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedBlipId, setSelectedBlipId] = useState<string>('blip_metric_storytelling');

  // Canvas Ref for Polar Skill Currency Radar
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sweepAngleRef = useRef<number>(0);

  // 2. Comprehensive Hardcoded Econometric Mapping Calculation
  const activeProfile = useMemo(() => {
    const roleCfg = ROLE_PROFILES[targetRole] || ROLE_PROFILES['Senior Data Scientist'];
    const cityCfg = CITY_COEFFICIENTS[primaryCity] || CITY_COEFFICIENTS['Bengaluru'];

    // Experience multiplier curve
    let expMultiplier = 1.0;
    if (experienceYears < 2) expMultiplier = 0.88;
    else if (experienceYears <= 4) expMultiplier = 1.0;
    else if (experienceYears <= 7) expMultiplier = 1.18;
    else if (experienceYears <= 10) expMultiplier = 1.35;
    else expMultiplier = 1.55;

    // Baseline current salary
    const baselineMid = Number(currentSalaryLPA);

    // Dynamic Market Health Index (55 - 96 scale)
    const expBonus = Math.min(10, Math.max(-5, (experienceYears - 3.5) * 1.8));
    const salaryRelativity = Math.min(8, Math.max(-6, ((baselineMid - roleCfg.baseSalaryMin) / 10) * 3));
    const marketHealthScore = Math.min(
      96,
      Math.max(55, Math.round(roleCfg.healthBase + expBonus + salaryRelativity))
    );

    // 4 Career Zone Calculations
    // Zone 1: Current Baseline
    const baselineMin = Number(Math.max(5.7, baselineMid * 0.88).toFixed(1));
    const baselineMax = Number((baselineMid * 1.14).toFixed(1));

    // Zone 2: Red Zone Decay Dip (-18% to -28% drop)
    const redDipMid = Number(Math.max(5.7, baselineMid * (1 - roleCfg.decayRate)).toFixed(1));
    const redDipMin = Number((redDipMid * 0.85).toFixed(1));
    const redDipMax = Number((redDipMid * 1.10).toFixed(1));
    const redDipDelta = Number((redDipMid - baselineMid).toFixed(1));
    const redDipPct = Math.round(((redDipMid - baselineMid) / baselineMid) * 100);

    // Zone 3: Yellow Zone Modernization (+35% to +48% bridge)
    const yellowMid = Number(
      Math.min(roleCfg.marketCeiling * 0.85, baselineMid * (1 + roleCfg.modernGainRate * (cityCfg.multiplier / 1.1))).toFixed(1)
    );
    const yellowMin = Number((yellowMid * 0.90).toFixed(1));
    const yellowMax = Number((yellowMid * 1.18).toFixed(1));
    const yellowDelta = Number((yellowMid - baselineMid).toFixed(1));
    const yellowPct = Math.round(((yellowMid - baselineMid) / baselineMid) * 100);

    // Zone 4: Green Multiplier Spike (+108% to +140% surge up to 82 LPA)
    const rawSpike = baselineMid * (roleCfg.spikeMultiplier * (cityCfg.multiplier / 1.1));
    const greenSpikeMid = Number(Math.min(roleCfg.marketCeiling, Math.max(yellowMid + 6, rawSpike)).toFixed(1));
    const greenSpikeMin = Number((greenSpikeMid * 0.88).toFixed(1));
    const greenSpikeMax = Number(Math.min(82.0, greenSpikeMid * 1.25).toFixed(1));
    const greenSpikeDelta = Number((greenSpikeMid - baselineMid).toFixed(1));
    const greenSpikePct = Math.round(((greenSpikeMid - baselineMid) / baselineMid) * 100);

    // Max LPA for bar visualization scaling
    const maxLPA = Math.max(greenSpikeMax, roleCfg.marketCeiling, 82.0);

    // Dynamic Trajectory Points
    const salaryCurve: TrajectoryPoint[] = [
      {
        scenario: 'Current Profile Baseline',
        zoneTag: 'baseline',
        zoneLabel: 'Active Evaluated Base',
        experience_years: experienceYears,
        min_lpa: baselineMin,
        mid_lpa: baselineMid,
        max_lpa: baselineMax,
        delta_lpa: 0,
        percentage_change: 0,
        is_salary_spike: false,
      },
      {
        scenario: 'Red Zone Decay Dip',
        zoneTag: 'red',
        zoneLabel: `${redDipPct}% Legacy Erosion`,
        experience_years: experienceYears + 1.5,
        min_lpa: redDipMin,
        mid_lpa: redDipMid,
        max_lpa: redDipMax,
        delta_lpa: redDipDelta,
        percentage_change: redDipPct,
        is_salary_spike: false,
      },
      {
        scenario: 'Yellow Zone Modernization',
        zoneTag: 'yellow',
        zoneLabel: `+${yellowPct}% Runway Bridge`,
        experience_years: experienceYears + 1.5,
        min_lpa: yellowMin,
        mid_lpa: yellowMid,
        max_lpa: yellowMax,
        delta_lpa: yellowDelta,
        percentage_change: yellowPct,
        is_salary_spike: false,
      },
      {
        scenario: 'Green Multiplier Spike',
        zoneTag: 'green',
        zoneLabel: `+${greenSpikePct}% Multiplier Surge`,
        experience_years: experienceYears + 3.0,
        min_lpa: greenSpikeMin,
        mid_lpa: greenSpikeMid,
        max_lpa: greenSpikeMax,
        delta_lpa: greenSpikeDelta,
        percentage_change: greenSpikePct,
        is_salary_spike: true,
      },
    ];

    // Dynamic Blips mapped to active role & city
    const blips: RadarBlip[] = [
      {
        id: 'blip_metric_storytelling',
        name: 'Metric Storytelling & C-Suite Synthesis',
        dimension: 'Executive Strategy & Business Acumen',
        zone: 'THRIVING',
        polar_angle_deg: 36,
        polar_radius_pct: Math.max(18, 32 - experienceYears * 1.5),
        current_market_demand_pct: 95,
        salary_hike_correlation: 0.544,
        projected_lpa_impact: Number((8.8 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Transform raw model outputs into C-suite EBITDA attribution slides and gross margin retention metrics.',
      },
      {
        id: 'blip_distributed_pytorch',
        name: 'Distributed Training & Inference Engine',
        dimension: 'Core Deep Learning Systems',
        zone: 'THRIVING',
        polar_angle_deg: 120,
        polar_radius_pct: Math.max(22, 35 - experienceYears * 1.2),
        current_market_demand_pct: 92,
        salary_hike_correlation: 0.518,
        projected_lpa_impact: Number((7.6 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Deploy TensorRT quantization, Multi-GPU DistributedDataParallel (DDP), and vLLM dynamic batching for sub-10ms SLAs.',
      },
      {
        id: 'blip_agentic_rag',
        name: 'Agentic Workflows & Enterprise RAG',
        dimension: 'Applied Generative AI',
        zone: 'THRIVING',
        polar_angle_deg: 215,
        polar_radius_pct: Math.max(20, 30 - experienceYears * 1.1),
        current_market_demand_pct: 96,
        salary_hike_correlation: 0.495,
        projected_lpa_impact: Number((8.1 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Construct hybrid dense-sparse vector indexing (Milvus/Qdrant) with LangGraph routing and automated hallucination guardrails.',
      },
      {
        id: 'blip_dbt_snowflake',
        name: 'dbt Semantic Layer & Lakehouse',
        dimension: 'Data Platform Architecture',
        zone: 'TRANSITION',
        polar_angle_deg: 75,
        polar_radius_pct: Math.min(68, 52 + (experienceYears < 3 ? 12 : 0)),
        current_market_demand_pct: 80,
        salary_hike_correlation: 0.412,
        projected_lpa_impact: Number((4.8 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Replace fragile procedural SQL scripts with modular dbt version-controlled data pipelines and automated testing.',
      },
      {
        id: 'blip_mlops_cicd',
        name: 'Kubeflow Pipelines & CI/CD Telemetry',
        dimension: 'ML Operations & Infrastructure',
        zone: 'TRANSITION',
        polar_angle_deg: 165,
        polar_radius_pct: Math.min(65, 55 + (experienceYears < 3 ? 8 : 0)),
        current_market_demand_pct: 76,
        salary_hike_correlation: 0.385,
        projected_lpa_impact: Number((4.4 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Containerize training jobs in Docker with GitHub Actions automation and EvidentlyAI covariate drift monitoring.',
      },
      {
        id: 'blip_causal_stats',
        name: 'Causal Inference & Quasi-Experiments',
        dimension: 'Applied Econometrics & Stats',
        zone: 'TRANSITION',
        polar_angle_deg: 290,
        polar_radius_pct: 60,
        current_market_demand_pct: 72,
        salary_hike_correlation: 0.362,
        projected_lpa_impact: Number((3.9 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Implement Difference-in-Differences and DoWhy causal graph models to decouple true policy treatment from user selection bias.',
      },
      {
        id: 'blip_excel_vba',
        name: 'Legacy Excel VBA & Manual Spreadsheets',
        dimension: 'Legacy Productivity Tools',
        zone: 'AT_RISK',
        polar_angle_deg: 110,
        polar_radius_pct: 86,
        current_market_demand_pct: 21,
        salary_hike_correlation: -0.32,
        projected_lpa_impact: Number((-3.8 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Urgent: Deprecate manual spreadsheet handoffs. Replatform all business critical scoring into audited Python/SQL pipelines.',
      },
      {
        id: 'blip_manual_tableau',
        name: 'Static Ad-hoc BI Refreshing',
        dimension: 'Legacy Reporting',
        zone: 'AT_RISK',
        polar_angle_deg: 245,
        polar_radius_pct: 89,
        current_market_demand_pct: 25,
        salary_hike_correlation: -0.28,
        projected_lpa_impact: Number((-2.6 * cityCfg.multiplier).toFixed(1)),
        remediation_path:
          'Migrate static reporting to automated semantic lakehouse views and real-time reverse ETL webhooks.',
      },
    ];

    // Dynamic Executive Warning
    const ceilingWarning = roleCfg.ceilingWarningTemplate(
      experienceYears,
      primaryCity,
      Math.round(roleCfg.marketCeiling * 0.72)
    );

    return {
      roleCfg,
      cityCfg,
      marketHealthScore,
      netUpsideLPA: greenSpikeDelta,
      salaryCurve,
      maxLPA,
      blips,
      ceilingWarning,
    };
  }, [targetRole, experienceYears, currentSalaryLPA, primaryCity]);

  // Selected Blip
  const selectedBlip = useMemo(() => {
    return (
      activeProfile.blips.find((b) => b.id === selectedBlipId) ||
      activeProfile.blips[0]
    );
  }, [activeProfile.blips, selectedBlipId]);

  // Handle Scan Action Button
  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  // 3. Dynamic Canvas Polar Radar with Overlay Polygons
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(centerX, centerY) - 24;

      // Clean Light Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 1. Zone Tint Shading
      // Red Outer Zone Shading
      ctx.fillStyle = 'rgba(254, 242, 242, 0.5)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // Yellow Mid Zone Shading
      ctx.fillStyle = 'rgba(254, 252, 232, 0.7)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.72, 0, Math.PI * 2);
      ctx.fill();

      // Green Inner Zone Shading
      ctx.fillStyle = 'rgba(236, 253, 245, 0.85)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.40, 0, Math.PI * 2);
      ctx.fill();

      // 2. Zone Boundary Rings
      ctx.lineWidth = 1.5;

      // Red Boundary
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.stroke();

      // Yellow Boundary
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.72, 0, Math.PI * 2);
      ctx.stroke();

      // Green Boundary
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.40, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Radial Spoke Axes for the 8 Dimensions
      const dims = activeProfile.roleCfg.keyDimensions;
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = '#e5e7eb';
      dims.forEach((d) => {
        const rad = (d.angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + maxRadius * 0.95 * Math.cos(rad), centerY + maxRadius * 0.95 * Math.sin(rad));
        ctx.stroke();
      });

      // 4. Target Role Benchmark Polygon (Golden dashed overlay)
      ctx.save();
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      dims.forEach((d, idx) => {
        const rad = (d.angle * Math.PI) / 180;
        const r = (d.targetPct / 100) * maxRadius * 0.95;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // 5. Active Profile Standing Polygon (Reactive to experience & salary)
      const expScale = Math.min(1.2, Math.max(0.7, experienceYears / 5));
      ctx.save();
      ctx.beginPath();
      dims.forEach((d, idx) => {
        const rad = (d.angle * Math.PI) / 180;
        const dynamicPct = Math.min(94, Math.max(25, d.baselinePct * expScale));
        const r = (dynamicPct / 100) * maxRadius * 0.95;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
      ctx.fill();
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Vertex dots
      dims.forEach((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const dynamicPct = Math.min(94, Math.max(25, d.baselinePct * expScale));
        const r = (dynamicPct / 100) * maxRadius * 0.95;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#059669';
        ctx.fill();
      });
      ctx.restore();

      // 6. Sweeping Radar Beam Animation
      sweepAngleRef.current = (sweepAngleRef.current + (isScanning ? 0.06 : 0.016)) % (Math.PI * 2);
      const sweepAngle = sweepAngleRef.current;

      const beamGrad = ctx.createConicGradient(sweepAngle, centerX, centerY);
      beamGrad.addColorStop(0, 'rgba(16, 185, 129, 0.42)');
      beamGrad.addColorStop(0.08, 'rgba(16, 185, 129, 0.08)');
      beamGrad.addColorStop(0.2, 'rgba(16, 185, 129, 0)');
      beamGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // 7. Render Blips
      activeProfile.blips.forEach((blip) => {
        const rad = (blip.polar_angle_deg * Math.PI) / 180;
        const r = (blip.polar_radius_pct / 100) * maxRadius;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);

        const isSelected = blip.id === selectedBlipId;

        let blipColor = '#10b981';
        let glowColor = 'rgba(16, 185, 129, 0.4)';
        if (blip.zone === 'AT_RISK') {
          blipColor = '#ef4444';
          glowColor = 'rgba(239, 68, 68, 0.4)';
        } else if (blip.zone === 'TRANSITION') {
          blipColor = '#f59e0b';
          glowColor = 'rgba(245, 158, 11, 0.4)';
        }

        // Draw Outer Glow
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 12 : 6.5, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Draw Core Circle
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 6.5 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = blipColor;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        if (isSelected) {
          ctx.font = 'bold 9px ui-sans-serif, system-ui';
          ctx.fillStyle = '#111827';
          ctx.fillText(blip.name.split(' ')[0], x + 8, y - 4);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeProfile, selectedBlipId, isScanning, experienceYears]);

  // Click on Canvas to Select Blip
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) - 24;

    for (const blip of activeProfile.blips) {
      const rad = (blip.polar_angle_deg * Math.PI) / 180;
      const r = (blip.polar_radius_pct / 100) * maxRadius;
      const x = centerX + r * Math.cos(rad);
      const y = centerY + r * Math.sin(rad);

      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist <= 14) {
        setSelectedBlipId(blip.id);
        break;
      }
    }
  };

  return (
    <section
      id="market-radar-simulator"
      className="w-full max-w-7xl mx-auto space-y-5 bg-[#fcfbf9] text-gray-950 font-sans p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs"
    >
      {/* ======================================================== */}
      {/* 1. Header & Live Telemetry Indices                       */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Grower Portal • Market Radar & Salary Spike Simulator
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-600 font-medium">JDS/SDS Hackathon Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 tracking-tight">
            Market Radar & Salary Spike Simulator
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Real-time skill currency monitor evaluating salary hike elasticity and career zone multipliers across 5.7 to 82 LPA industry compensation distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right px-3.5 py-2 bg-[#f4f2ee] rounded-xl border border-gray-200">
            <span className="text-[10px] font-semibold text-gray-600 block uppercase tracking-wider">
              Market Currency Health
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700">
              {activeProfile.marketHealthScore}
              <span className="text-xs text-gray-500 font-normal">/100</span>
            </span>
          </div>

          <div className="text-left sm:text-right px-3.5 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[10px] font-semibold text-emerald-800 block uppercase tracking-wider">
              Projected Net Upside
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700">
              +{activeProfile.netUpsideLPA} LPA
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Inputs & Dataset Integration (Hardcoded)  */}
      {/* ======================================================== */}
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Target Role Evaluation</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="Senior Data Scientist">Senior Data Scientist</option>
            <option value="Data Architect">Data Architect</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Lead Analytics Consultant">Lead Analytics Consultant</option>
            <option value="Executive Director of AI">Executive Director of AI</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Experience (Years)</label>
          <input
            type="number"
            step="0.5"
            min="1"
            max="25"
            value={experienceYears}
            onChange={(e) => setExperienceYears(Math.max(1, Number(e.target.value)))}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Current Base Salary (LPA)</label>
          <input
            type="number"
            step="0.5"
            min="4"
            max="65"
            value={currentSalaryLPA}
            onChange={(e) => setCurrentSalaryLPA(Math.max(4, Number(e.target.value)))}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Primary Metro City</label>
          <select
            value={primaryCity}
            onChange={(e) => setPrimaryCity(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="Bengaluru">Bengaluru (1.15x Tech Premium)</option>
            <option value="Gurgaon">Gurgaon (1.15x Tech Premium)</option>
            <option value="Mumbai">Mumbai (1.12x Financial Premium)</option>
            <option value="Hyderabad">Hyderabad (1.08x Premium)</option>
            <option value="Pune">Pune (1.08x R&D Premium)</option>
            <option value="Chennai">Chennai (1.04x Premium)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isScanning ? (
              <>
                <RefreshCwIcon className="w-4 h-4 animate-spin" />
                <span>Sweeping Radar...</span>
              </>
            ) : (
              <>
                <ZapIcon className="w-4 h-4" />
                <span>Scan Market Currency</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Executive Ceiling Warning Banner                     */}
      {/* ======================================================== */}
      <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs leading-relaxed font-medium flex items-start gap-2.5 animate-fade-in">
        <AlertOctagonIcon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>{activeProfile.ceilingWarning}</p>
      </div>

      {/* ======================================================== */}
      {/* 4. Main Two-Column Layout: Radar + Salary Trajectory    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column (5 cols): Polar Radar Canvas with Overlay Polygon */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-bold text-gray-950 flex items-center gap-1.5">
                <span>Polar Skill Currency Radar</span>
              </h3>
              <span className="text-[10px] text-gray-500 font-medium">Click blip to inspect</span>
            </div>
            <p className="text-[11px] text-gray-600 mb-2 leading-snug">
              Overlay polygon shows active profile standing across 8 core axes vs. market benchmarks.
            </p>
          </div>

          <div className="flex justify-center items-center my-1 relative">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onClick={handleCanvasClick}
              className="rounded-xl border border-gray-200 cursor-crosshair shadow-2xs max-w-full h-auto"
            />
          </div>

          <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-[10px] text-gray-600 gap-1.5">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              Green Spike (Thriving)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Yellow Bridge (Modernize)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Red At-Risk (Decaying)
            </span>
          </div>
        </div>

        {/* Right Column (7 cols): Dynamic Salary Trajectory & Spike Simulator */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-emerald-700" />
                Dynamic Salary Trajectory & Spike Simulator
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                Scale: 5.7 – 82 LPA
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3.5">
              Real-time econometric projections across 4 career zones for {targetRole} ({primaryCity}).
            </p>

            {/* 4 Career Zones */}
            <div className="space-y-2.5">
              {activeProfile.salaryCurve.map((point) => {
                const widthPct = Math.min(100, Math.max(12, (point.mid_lpa / activeProfile.maxLPA) * 100));

                let barColor = 'bg-gray-400';
                let tagColor = 'bg-gray-100 text-gray-800';

                if (point.zoneTag === 'green') {
                  barColor = 'bg-emerald-600';
                  tagColor = 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold';
                } else if (point.zoneTag === 'yellow') {
                  barColor = 'bg-amber-500';
                  tagColor = 'bg-amber-50 text-amber-800 border border-amber-300 font-bold';
                } else if (point.zoneTag === 'red') {
                  barColor = 'bg-red-500';
                  tagColor = 'bg-red-50 text-red-800 border border-red-300 font-bold';
                }

                return (
                  <div
                    key={point.scenario}
                    className="p-3 rounded-xl border border-gray-200 bg-[#fcfbf9] hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{point.scenario}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${tagColor}`}>
                          {point.zoneLabel}
                        </span>
                      </div>

                      <div className="font-mono text-xs">
                        <strong className="text-gray-950">{point.mid_lpa} LPA</strong>
                        <span className="text-gray-500 text-[11px] ml-1.5">
                          (₹{point.min_lpa} - ₹{point.max_lpa} LPA)
                        </span>
                        {point.delta_lpa !== 0 && (
                          <span
                            className={`ml-1.5 font-bold text-[11px] ${
                              point.delta_lpa > 0 ? 'text-emerald-700' : 'text-red-700'
                            }`}
                          >
                            {point.delta_lpa > 0 ? `+₹${point.delta_lpa}` : `₹${point.delta_lpa}`} LPA
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-gray-200 flex justify-between text-[11px] text-gray-500 font-mono">
            <span>₹5.7 LPA (Entry Base)</span>
            <span>₹{(activeProfile.maxLPA / 2).toFixed(1)} LPA (Senior Median)</span>
            <span>₹{activeProfile.maxLPA.toFixed(1)} LPA (Market Ceiling)</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Modernization Inspector & Blip Diagnostics Panel      */}
      {/* ======================================================== */}
      {selectedBlip && (
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 mb-3 gap-2">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase block">
                Modernization Telemetry Inspector
              </span>
              <h4 className="text-base font-bold text-gray-950">{selectedBlip.name}</h4>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                Hike Elasticity: <strong className="text-emerald-800 font-mono">r = {selectedBlip.salary_hike_correlation}</strong>
              </span>
              <span
                className={`px-2.5 py-1 rounded-full font-bold font-mono ${
                  selectedBlip.projected_lpa_impact > 0
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-red-50 text-red-800 border border-red-300'
                }`}
              >
                Impact: {selectedBlip.projected_lpa_impact > 0 ? `+₹${selectedBlip.projected_lpa_impact}` : `₹${selectedBlip.projected_lpa_impact}`} LPA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#fcfbf9] rounded-xl border border-gray-200">
              <span className="font-semibold text-gray-700 block mb-1">Market Velocity</span>
              <p className="text-gray-600 mb-1">
                Demand Index: <strong className="text-emerald-700">{selectedBlip.current_market_demand_pct}%</strong>
              </p>
              <p className="text-gray-600">
                Competency Sector: <strong className="text-gray-900">{selectedBlip.dimension}</strong>
              </p>
            </div>

            <div className="p-3 bg-[#fcfbf9] rounded-xl border border-gray-200 md:col-span-2">
              <span className="font-semibold text-gray-700 block mb-1">Actionable Modernization Remediation</span>
              <p className="text-gray-800 font-mono text-[11px] leading-relaxed p-2.5 bg-white rounded-lg border border-gray-200">
                {selectedBlip.remediation_path}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketRadarFlightDeck;
