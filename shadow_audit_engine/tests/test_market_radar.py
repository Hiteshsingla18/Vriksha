"""
test_market_radar.py
Automated test suite verifying the Grower Portal Market Radar Engine & Salary Spike Simulator.
"""

from app.api.schemas_radar import RadarScanRequest, RadarZone
from app.grower.radar_engine import GrowerRadarEngine
from app.grower.salary_spike_simulator import SalarySpikeSimulator

def test_radar_blips_partitioning():
    engine = GrowerRadarEngine()
    req = RadarScanRequest(
        user_id="grower_001",
        current_role="Data Scientist",
        experience_years=3.5,
        current_salary_lpa=12.0,
        active_skills=["Python", "SQL", "metric_storytelling", "excel_vba_macros"],
        primary_city="Bengaluru"
    )
    
    blips, health_score, net_uplift, summary, ceiling_warning = engine.generate_radar_scan(req)
    
    zones = [b.zone for b in blips]
    assert RadarZone.AT_RISK in zones
    assert RadarZone.TRANSITION in zones
    assert RadarZone.THRIVING in zones
    
    # Check Green Zone positive LPA impact
    green_blips = [b for b in blips if b.zone == RadarZone.THRIVING]
    for g in green_blips:
        assert g.projected_lpa_impact > 0.0

    # Check Red Zone negative or low LPA impact
    red_blips = [b for b in blips if b.zone == RadarZone.AT_RISK]
    for r in red_blips:
        assert r.projected_lpa_impact <= 0.0

    assert health_score > 0.0
    assert net_uplift > 0.0
    assert "Radar scan evaluated" in summary

def test_salary_spike_simulator():
    simulator = SalarySpikeSimulator()
    points = simulator.simulate_trajectory(
        current_role="Senior Data Scientist",
        experience_years=4.0,
        current_salary_lpa=20.0,
        primary_city="Bengaluru",
        active_skills=["Python", "metric_storytelling"]
    )
    
    assert len(points) == 4
    scenarios = [p.scenario for p in points]
    assert "Current Profile Baseline" in scenarios
    assert "Red Zone Decay Dip" in scenarios
    assert "Yellow Zone Modernization" in scenarios
    assert "Green Multiplier Spike" in scenarios

    # Check Green Spike scenario produces peak compensation
    green_point = next(p for p in points if p.scenario == "Green Multiplier Spike")
    baseline_point = next(p for p in points if p.scenario == "Current Profile Baseline")
    red_point = next(p for p in points if p.scenario == "Red Zone Decay Dip")

    assert green_point.mid_lpa > baseline_point.mid_lpa
    assert green_point.is_salary_spike is True
    assert red_point.mid_lpa < baseline_point.mid_lpa

if __name__ == "__main__":
    test_radar_blips_partitioning()
    test_salary_spike_simulator()
    print("test_market_radar passed 100%!")
