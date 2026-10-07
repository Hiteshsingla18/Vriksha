import React, { useState, useEffect } from 'react';
import { RadarCanvas, Blip } from './RadarCanvas';
import { SalarySpikeChart, TrajectoryPoint } from './SalarySpikeChart';

export interface ScanResponse {
  user_id: str;
  role_evaluated: str;
  market_health_score: number;
  net_potential_uplift_lpa: number;
  blips: Blip[];
  salary_curve: TrajectoryPoint[];
  executive_summary: str;
  executive_ceiling_warning?: string | null;
}

export const MarketRadarFlightDeck: React.FC = () => {
  const [currentRole, setCurrentRole] = useState('Data Scientist');
  const [experienceYears, setExperienceYears] = useState(3.5);
  const [currentSalaryLPA, setCurrentSalaryLPA] = useState(12.0);
  const [primaryCity, setPrimaryCity] = useState('Bengaluru');
  const [activeSkillsText, setActiveSkillsText] = useState('Python, SQL, Tableau, scikit_learn_modeling, excel_vba_macros');

  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [selectedBlip, setSelectedBlip] = useState<Blip | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRadarScan = async () => {
    setLoading(true);
    const skillsList = activeSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      const res = await fetch('http://localhost:8000/api/v1/grower/radar/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'grower_user_001',
          current_role: currentRole,
          experience_years: Number(experienceYears),
          current_salary_lpa: Number(currentSalaryLPA),
          active_skills: skillsList,
          primary_city: primaryCity,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setScanResult(data);
        if (data.blips && data.blips.length > 0) {
          setSelectedBlip(data.blips[0]);
        }
      } else {
        fallbackMockScan(skillsList);
      }
    } catch {
      fallbackMockScan(skillsList);
    } finally {
      setLoading(false);
    }
  };

  const fallbackMockScan = (skillsList: string[]) => {
    const mockBlips: Blip[] = [
      {
        id: 'blip_metric_storytelling',
        name: 'Metric Storytelling & Business Causal Decking',
        dimension: 'dashboard_and_storytelling_skills',
        zone: 'THRIVING',
        polar_angle_deg: 36,
        polar_radius_pct: 22,
        current_market_demand_pct: 92,
        salary_hike_correlation: 0.544,
        projected_lpa_impact: 8.5,
        remediation_path: 'Transition static BI reports to executive causal narrative dashboards linking metrics directly to EBITDA.',
        is_user_active: skillsList.some((s) => s.toLowerCase().includes('metric')),
      },
      {
        id: 'blip_causal_inference_ab',
        name: 'Causal Inference & Synthetic Control A/B Testing',
        dimension: 'maths_stats_skills',
        zone: 'THRIVING',
        polar_angle_deg: 108,
        polar_radius_pct: 28,
        current_market_demand_pct: 89,
        salary_hike_correlation: 0.515,
        projected_lpa_impact: 7.8,
        remediation_path: 'Master Difference-in-Differences and Propensity Score Matching for non-randomized experiment evaluation.',
        is_user_active: false,
      },
      {
        id: 'blip_sql_dbt_transformation',
        name: 'Modular SQL & dbt Cloud Analytics Engineering',
        dimension: 'coding_skills',
        zone: 'TRANSITION',
        polar_angle_deg: 198,
        polar_radius_pct: 62,
        current_market_demand_pct: 82,
        salary_hike_correlation: 0.360,
        projected_lpa_impact: 3.8,
        remediation_path: 'Package ad-hoc SQL scripts into version-controlled dbt models with automated schema testing.',
        is_user_active: true,
      },
      {
        id: 'blip_excel_vba_macros',
        name: 'Legacy Excel VBA & Manual Reporting Macros',
        dimension: 'dashboard_and_storytelling_skills',
        zone: 'AT_RISK',
        polar_angle_deg: 18,
        polar_radius_pct: 88,
        current_market_demand_pct: 34,
        salary_hike_correlation: 0.120,
        projected_lpa_impact: -2.5,
        remediation_path: 'Migrate manual VBA script workflows to automated Python/Pandas data pipelines and Streamlit apps.',
        is_user_active: true,
      },
    ];

    const mockCurve: TrajectoryPoint[] = [
      {
        scenario: 'Current Profile Baseline',
        experience_years: Number(experienceYears),
        min_lpa: Number(currentSalaryLPA) - 2.5,
        mid_lpa: Number(currentSalaryLPA),
        max_lpa: Number(currentSalaryLPA) + 5.0,
        delta_lpa: 0,
        is_salary_spike: false,
      },
      {
        scenario: 'Red Zone Decay Dip',
        experience_years: Number(experienceYears) + 1.5,
        min_lpa: (Number(currentSalaryLPA) - 2.5) * 0.8,
        mid_lpa: Number(currentSalaryLPA) * 0.85,
        max_lpa: (Number(currentSalaryLPA) + 5.0) * 0.88,
        delta_lpa: -1.8,
        is_salary_spike: false,
      },
      {
        scenario: 'Yellow Zone Modernization',
        experience_years: Number(experienceYears) + 1.5,
        min_lpa: Number(currentSalaryLPA) + 2.0,
        mid_lpa: Number(currentSalaryLPA) + 3.8,
        max_lpa: Number(currentSalaryLPA) + 6.5,
        delta_lpa: +3.8,
        is_salary_spike: false,
      },
      {
        scenario: 'Green Multiplier Spike',
        experience_years: Number(experienceYears) + 3.0,
        min_lpa: Number(currentSalaryLPA) + 6.0,
        mid_lpa: Number(currentSalaryLPA) + 9.5,
        max_lpa: Number(currentSalaryLPA) + 16.0,
        delta_lpa: +9.5,
        is_salary_spike: true,
      },
    ];

    setScanResult({
      user_id: 'grower_user_001',
      role_evaluated: currentRole,
      market_health_score: 72.5,
      net_potential_uplift_lpa: 12.3,
      blips: mockBlips,
      salary_curve: mockCurve,
      executive_summary:
        'Radar scan evaluated your skills against market benchmarks. Closing top Green/Yellow gaps unlocks an estimated +₹12.3 LPA upside.',
      executive_ceiling_warning:
        '⚠️ EXECUTIVE CEILING WARNING: Your profile exhibits strong technical & coding signals but lacks high-impact Metric Storytelling (r = 0.544). In Senior Data Scientist bands, inability to translate model telemetry to C-suite EBITDA limits compensation ceiling.',
    });
    setSelectedBlip(mockBlips[0]);
  };

  useEffect(() => {
    fetchRadarScan();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-[#0B0F09] min-h-screen text-slate-100 font-sans">
      {/* Flight Deck Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-[#12160E] to-[#1A2316] rounded-2xl border border-emerald-900/50 shadow-xl gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-white">
              GROWER PORTAL <span className="text-emerald-400 font-normal">| Market Radar & Spike Simulator</span>
            </h1>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
              vriksha.app/grow
            </span>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Real-Time Skill Currency Monitor & High-ROI Compensation Trajectory Simulator
          </p>
        </div>

        {scanResult && (
          <div className="flex items-center gap-6 bg-slate-900/80 p-3 rounded-xl border border-emerald-500/20">
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Market Health Index</span>
              <span className="text-2xl font-black text-emerald-400">{scanResult.market_health_score}/100</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Net Upside Uplift</span>
              <span className="text-2xl font-black text-amber-300">+₹{scanResult.net_potential_uplift_lpa} LPA</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel Inputs */}
      <div className="p-5 bg-[#12160E] rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Target Role</label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium"
          >
            <option value="Data Analyst">Data Analyst</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Senior Data Scientist">Senior Data Scientist</option>
            <option value="Data Architect">Data Architect</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Experience (Years)</label>
          <input
            type="number"
            step="0.5"
            value={experienceYears}
            onChange={(e) => setExperienceYears(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Current Salary (LPA)</label>
          <input
            type="number"
            step="0.5"
            value={currentSalaryLPA}
            onChange={(e) => setCurrentSalaryLPA(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Primary Metro City</label>
          <select
            value={primaryCity}
            onChange={(e) => setPrimaryCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium"
          >
            <option value="Bengaluru">Bengaluru (1.15x)</option>
            <option value="Gurgaon">Gurgaon (1.15x)</option>
            <option value="Hyderabad">Hyderabad (1.08x)</option>
            <option value="Pune">Pune (1.08x)</option>
            <option value="Chennai">Chennai (1.04x)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={fetchRadarScan}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            {loading ? 'Scanning...' : '⚡ Scan Market Currency'}
          </button>
        </div>
      </div>

      {/* Executive Warnings */}
      {scanResult?.executive_ceiling_warning && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs leading-relaxed font-medium">
          {scanResult.executive_ceiling_warning}
        </div>
      )}

      {/* Main Grid: Polar Radar + Trajectory Chart */}
      {scanResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Scanner */}
          <RadarCanvas
            blips={scanResult.blips}
            selectedBlip={selectedBlip}
            onSelectBlip={(b) => setSelectedBlip(b)}
          />

          {/* Salary Trajectory Chart */}
          <SalarySpikeChart
            salaryCurve={scanResult.salary_curve}
            highlightedSkillName={selectedBlip?.name}
          />
        </div>
      )}

      {/* Modernization Deck & Blip Inspector */}
      {selectedBlip && (
        <div className="p-6 bg-[#12160E] rounded-2xl border border-emerald-900/60 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Modernization Inspector
              </span>
              <h2 className="text-xl font-black text-white">{selectedBlip.name}</h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 bg-slate-800 text-slate-200 rounded-full font-semibold">
                Pearson Hike Correlation: <strong className="text-emerald-400">r = {selectedBlip.salary_hike_correlation}</strong>
              </span>
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                Impact: {selectedBlip.projected_lpa_impact > 0 ? `+₹${selectedBlip.projected_lpa_impact}` : `₹${selectedBlip.projected_lpa_impact}`} LPA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <h4 className="font-bold text-slate-300 mb-2">Market Velocity & Demand</h4>
              <p className="text-slate-400 mb-1">Market Demand Index: <span className="text-emerald-400 font-bold">{selectedBlip.current_market_demand_pct}%</span></p>
              <p className="text-slate-400">Competency Sector: <span className="text-amber-300 font-semibold">{selectedBlip.dimension}</span></p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 md:col-span-2">
              <h4 className="font-bold text-slate-300 mb-2">Actionable Modernization Path</h4>
              <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                {selectedBlip.remediation_path}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
