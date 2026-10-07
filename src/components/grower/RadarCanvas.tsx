import React, { useEffect, useRef, useState } from 'react';

export interface Blip {
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
  is_user_active?: boolean;
}

interface RadarCanvasProps {
  blips: Blip[];
  selectedBlip: Blip | null;
  onSelectBlip: (blip: Blip) => void;
}

export const RadarCanvas: React.FC<RadarCanvasProps> = ({
  blips,
  selectedBlip,
  onSelectBlip,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredBlip, setHoveredBlip] = useState<Blip | null>(null);
  const sweepAngleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(centerX, centerY) - 20;

      // Clear Canvas (#12160E Dark Mode background)
      ctx.fillStyle = '#12160E';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Rings
      ctx.lineWidth = 1.5;
      
      // Outer Ring - Red Zone Boundary (95%)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.stroke();

      // Mid Ring - Yellow Zone Boundary (72%)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.72, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Ring - Green Zone Boundary (40%)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.40, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Muted Axis Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      // Draw Rotating Sweeping Beam
      sweepAngleRef.current = (sweepAngleRef.current + 0.015) % (Math.PI * 2);
      const currentAngle = sweepAngleRef.current;

      const gradient = ctx.createConicGradient(currentAngle, centerX, centerY);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
      gradient.addColorStop(0.1, 'rgba(16, 185, 129, 0.05)');
      gradient.addColorStop(0.2, 'rgba(16, 185, 129, 0)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // Draw Blips
      blips.forEach((blip) => {
        const rad = (blip.polar_angle_deg * Math.PI) / 180;
        const r = (blip.polar_radius_pct / 100) * maxRadius;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);

        let color = '#10B981'; // Green THRIVING
        if (blip.zone === 'TRANSITION') color = '#F59E0B'; // Yellow
        if (blip.zone === 'AT_RISK') color = '#EF4444'; // Red

        const isSelected = selectedBlip?.id === blip.id;
        const isHovered = hoveredBlip?.id === blip.id;

        // Glowing outer circle for active blips
        ctx.shadowColor = color;
        ctx.shadowBlur = isSelected || isHovered ? 18 : 8;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 8 : isHovered ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset glow

        // User Active ring
        if (blip.is_user_active) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [blips, selectedBlip, hoveredBlip]);

  // Click & Hover Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    let found: Blip | null = null;
    for (const blip of blips) {
      const rad = (blip.polar_angle_deg * Math.PI) / 180;
      const r = (blip.polar_radius_pct / 100) * maxRadius;
      const x = centerX + r * Math.cos(rad);
      const y = centerY + r * Math.sin(rad);

      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist <= 12) {
        found = blip;
        break;
      }
    }
    setHoveredBlip(found);
  };

  const handleClick = () => {
    if (hoveredBlip) {
      onSelectBlip(hoveredBlip);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-[#12160E] rounded-2xl border border-emerald-950/60 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className="cursor-pointer rounded-full"
      />
      {/* Zone Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-emerald-100/80 font-medium">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" /> 🟢 Green Zone (Velocity & Multipliers)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B]" /> 🟡 Yellow Zone (Bridge & Transition)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" /> 🔴 Red Zone (Commoditized Decay)
        </span>
      </div>

      {/* Hover Card */}
      {hoveredBlip && (
        <div className="absolute top-6 left-6 p-3 bg-slate-900/90 backdrop-blur border border-emerald-500/40 rounded-lg text-xs text-white max-w-xs shadow-xl pointer-events-none z-20">
          <p className="font-bold text-emerald-400">{hoveredBlip.name}</p>
          <p className="text-slate-300 mt-1">Zone: <span className="font-semibold text-amber-300">{hoveredBlip.zone}</span></p>
          <p className="text-slate-300">Demand Index: {hoveredBlip.current_market_demand_pct}%</p>
          <p className="text-emerald-300 font-semibold mt-1">
            Impact: {hoveredBlip.projected_lpa_impact > 0 ? `+₹${hoveredBlip.projected_lpa_impact} LPA` : `₹${hoveredBlip.projected_lpa_impact} LPA`}
          </p>
        </div>
      )}
    </div>
  );
};
