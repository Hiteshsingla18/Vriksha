import React from 'react';

export interface TrajectoryPoint {
  scenario: string;
  experience_years: number;
  min_lpa: number;
  mid_lpa: number;
  max_lpa: number;
  delta_lpa: number;
  is_salary_spike: boolean;
}

interface SalarySpikeChartProps {
  salaryCurve: TrajectoryPoint[];
  highlightedSkillName?: string;
}

export const SalarySpikeChart: React.FC<SalarySpikeChartProps> = ({
  salaryCurve,
  highlightedSkillName,
}) => {
  const maxLPA = Math.max(...salaryCurve.map((p) => p.max_lpa), 40.0);

  return (
    <div className="p-6 bg-[#12160E] rounded-2xl border border-emerald-950/60 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-emerald-400">Dynamic Salary Trajectory & Spike Simulator</h3>
          <p className="text-xs text-slate-400">
            Projected LPA Compensation Bands across 4 Market Scenarios (Tenure vs Skills)
          </p>
        </div>
        {highlightedSkillName && (
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold animate-pulse">
            Focused: {highlightedSkillName}
          </span>
        )}
      </div>

      <div className="space-y-5">
        {salaryCurve.map((point) => {
          const isSpike = point.is_salary_spike;
          const isDecay = point.scenario.includes('Red Zone');
          const isModern = point.scenario.includes('Yellow Zone');
          
          let barBg = 'bg-slate-700';
          let borderStyle = 'border-slate-600';
          let textAccent = 'text-slate-200';

          if (isSpike) {
            barBg = 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 shadow-[0_0_15px_#10B981]';
            borderStyle = 'border-emerald-400';
            textAccent = 'text-emerald-400 font-extrabold';
          } else if (isDecay) {
            barBg = 'bg-gradient-to-r from-red-900 to-red-600/80 shadow-[0_0_10px_#EF4444]';
            borderStyle = 'border-red-500';
            textAccent = 'text-red-400 font-semibold';
          } else if (isModern) {
            barBg = 'bg-gradient-to-r from-amber-600 to-yellow-500';
            borderStyle = 'border-amber-400';
            textAccent = 'text-amber-300 font-semibold';
          }

          const widthPct = Math.min(100, (point.mid_lpa / maxLPA) * 100);

          return (
            <div key={point.scenario} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  {isSpike && <span className="text-emerald-400">🚀</span>}
                  {isDecay && <span className="text-red-400">📉</span>}
                  {point.scenario} ({point.experience_years} yrs exp)
                </span>
                <span className={textAccent}>
                  {point.mid_lpa} LPA (Range: ₹{point.min_lpa} - ₹{point.max_lpa} LPA)
                  {point.delta_lpa !== 0 && (
                    <span className="ml-2">
                      ({point.delta_lpa > 0 ? `+₹${point.delta_lpa}` : `₹${point.delta_lpa}`} LPA)
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${barBg} ${borderStyle}`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
        <span>₹0 LPA</span>
        <span>₹{(maxLPA / 2).toFixed(1)} LPA</span>
        <span>₹{maxLPA.toFixed(1)} LPA</span>
      </div>
    </div>
  );
};
