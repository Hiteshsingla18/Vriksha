import { useState } from "react"
import { explorerProfiles } from "../../data/explorerData"
import { ExplorerProfile } from "../../types"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

interface NearbyProfilesProps {
  onSelectProfile: (profile: ExplorerProfile) => void
}

export default function NearbyProfiles({
  onSelectProfile,
}: NearbyProfilesProps) {
  const [city, setCity] = useState("Chandigarh")

  const filtered = explorerProfiles.filter(
    (profile) =>
      city === "All demo locations" ||
      profile.location === city ||
      (city === "Chandigarh" && profile.location === "Mohali")
  )

  return (
    <section className="explorer-feature-section" id="nearby-not-famous">
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">05 · See a real pathway</div>
          <Heading level={2}>Nearby, Not Famous</Heading>
          <p>Discover people around you who are already walking the path.</p>
        </div>
        <label className="city-filter">
          <span>Your city</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Chandigarh</option>
            <option>Mohali</option>
            <option>All demo locations</option>
          </select>
        </label>
      </div>

      <div className="demo-notice">
        <Icon name="people" size={16} />
        <span>
          <strong>Demo profiles</strong> · These people and pathways are
          entirely fictional.
        </span>
      </div>

      <div className="nearby-profile-grid">
        {filtered.map((profile, index) => (
          <article className="nearby-profile-card" key={profile.name}>
            <div className={`nearby-avatar nearby-avatar-${index + 1}`}>
              {profile.name.slice(0, 1)}
            </div>
            <span className="demo-label">Demo profile</span>
            <Heading level={3}>{profile.name}</Heading>
            <strong>{profile.role}</strong>
            <small>
              {profile.location} · {profile.years}
            </small>
            <p>{profile.pathway}</p>
            <div className="chip-row">
              {profile.skills.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onSelectProfile(profile)}
              className="mt-auto pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[var(--forest-800)] hover:text-[var(--forest-950)]"
            >
              <span>View pathway</span>
              <Icon name="arrow" size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
