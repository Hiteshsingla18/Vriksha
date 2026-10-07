"""
salary_spike_simulator.py
Simulates 4 salary trajectories (Baseline, Red Decay, Yellow Modernization, Green Spike)
across tenure and metro compensation multipliers derived from cleaned_DataScience_Jobs.csv.
"""

from typing import List, Dict, Any
from app.api.schemas_radar import TrajectoryPoint

# Metro multipliers from empirical compensation dataset
METRO_MULTIPLIERS = {
    "bengaluru": 1.15,
    "bangalore": 1.15,
    "gurgaon": 1.15,
    "gurugram": 1.15,
    "hyderabad": 1.08,
    "pune": 1.08,
    "chennai": 1.04,
    "mumbai": 1.10,
    "noida": 1.08,
    "delhi": 1.10,
}

# Role compensation baselines (Base, Spread, Peak LPA)
ROLE_COMPENSATION_BASELINES = {
    "data analyst": {"base": 5.71, "spread": 6.48, "peak": 13.46},
    "machine learning engineer": {"base": 9.85, "spread": 7.95, "peak": 22.00},
    "data scientist": {"base": 13.53, "spread": 13.69, "peak": 25.50},
    "senior data scientist": {"base": 22.29, "spread": 14.41, "peak": 35.00},
    "data architect": {"base": 25.09, "spread": 15.15, "peak": 33.99},
}

class SalarySpikeSimulator:
    """
    Simulates compensation trajectory curves across 4 scenarios:
    1. Current Profile Baseline
    2. Red Zone Decay Dip
    3. Yellow Zone Modernization
    4. Green Multiplier Spike
    """

    def simulate_trajectory(
        self,
        current_role: str,
        experience_years: float,
        current_salary_lpa: float,
        primary_city: str,
        active_skills: List[str],
    ) -> List[TrajectoryPoint]:
        city_key = primary_city.lower().strip()
        metro_multiplier = METRO_MULTIPLIERS.get(city_key, 1.00)

        role_key = current_role.lower().strip()
        role_base = ROLE_COMPENSATION_BASELINES.get(role_key, ROLE_COMPENSATION_BASELINES["data scientist"])

        # Base calculations
        base_mid = max(current_salary_lpa, role_base["base"] * metro_multiplier)
        base_min = max(3.5, base_mid - (role_base["spread"] * 0.35))
        base_max = base_mid + (role_base["spread"] * 0.65)

        points: List[TrajectoryPoint] = []

        # Scenario 1: Current Baseline
        points.append(
            TrajectoryPoint(
                scenario="Current Profile Baseline",
                experience_years=experience_years,
                min_lpa=round(base_min, 1),
                mid_lpa=round(base_mid, 1),
                max_lpa=round(base_max, 1),
                delta_lpa=0.0,
                is_salary_spike=False,
            )
        )

        # Scenario 2: Red Zone Decay Dip (18 Months Outdated Tooling)
        decay_mid = base_mid * 0.85
        decay_min = base_min * 0.80
        decay_max = base_max * 0.88
        decay_delta = decay_mid - base_mid
        points.append(
            TrajectoryPoint(
                scenario="Red Zone Decay Dip",
                experience_years=experience_years + 1.5,
                min_lpa=round(decay_min, 1),
                mid_lpa=round(decay_mid, 1),
                max_lpa=round(decay_max, 1),
                delta_lpa=round(decay_delta, 1),
                is_salary_spike=False,
            )
        )

        # Scenario 3: Yellow Zone Modernization (+₹2.5 to +₹4.0 LPA)
        modern_mid = (base_mid + 3.2) * metro_multiplier
        modern_min = (base_min + 2.0) * metro_multiplier
        modern_max = (base_max + 4.5) * metro_multiplier
        modern_delta = modern_mid - base_mid
        points.append(
            TrajectoryPoint(
                scenario="Yellow Zone Modernization",
                experience_years=experience_years + 1.5,
                min_lpa=round(modern_min, 1),
                mid_lpa=round(modern_mid, 1),
                max_lpa=round(modern_max, 1),
                delta_lpa=round(modern_delta, 1),
                is_salary_spike=False,
            )
        )

        # Scenario 4: Green Multiplier Spike (+₹7.5 to +₹12.0 LPA)
        spike_mid = (base_mid + 8.5) * metro_multiplier
        spike_min = (base_min + 6.0) * metro_multiplier
        spike_max = min(role_base["peak"] * metro_multiplier + 10.0, (base_max + 14.0) * metro_multiplier)
        spike_delta = spike_mid - base_mid
        points.append(
            TrajectoryPoint(
                scenario="Green Multiplier Spike",
                experience_years=experience_years + 3.0,
                min_lpa=round(spike_min, 1),
                mid_lpa=round(spike_mid, 1),
                max_lpa=round(spike_max, 1),
                delta_lpa=round(spike_delta, 1),
                is_salary_spike=True,
            )
        )

        return points
