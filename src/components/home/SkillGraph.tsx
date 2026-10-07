interface SkillGraphProps {
  compact?: boolean
}

export default function SkillGraph({ compact = false }: SkillGraphProps) {
  const nodes = compact
    ? [
        { l: "Python", m: "Skill", x: 49, y: 15, t: "skill" },
        { l: "Machine Learning", m: "Skill", x: 34, y: 48, t: "skill" },
        { l: "Data", m: "Skill", x: 66, y: 50, t: "skill" },
        { l: "ML Engineer", m: "Role", x: 50, y: 82, t: "role" },
      ]
    : [
        { l: "Skills", m: "4.8k mapped", x: 50, y: 10, t: "core" },
        { l: "People", m: "Profiles", x: 16, y: 39, t: "people" },
        { l: "Careers", m: "Pathways", x: 40, y: 44, t: "career" },
        { l: "Education", m: "Learning", x: 76, y: 38, t: "education" },
        { l: "Employers", m: "Demand", x: 31, y: 76, t: "employer" },
        { l: "Companies", m: "Workforce", x: 68, y: 78, t: "company" },
      ]

  const links = compact
    ? [
        [49, 15, 34, 48],
        [49, 15, 66, 50],
        [34, 48, 50, 82],
        [66, 50, 50, 82],
      ]
    : [
        [50, 10, 16, 39],
        [50, 10, 40, 44],
        [50, 10, 76, 38],
        [16, 39, 31, 76],
        [40, 44, 31, 76],
        [40, 44, 68, 78],
        [76, 38, 68, 78],
        [31, 76, 68, 78],
      ]

  return (
    <div className={`skill-graph ${compact ? "compact" : ""} relative overflow-hidden rounded-xl`}>
      <svg
        className="graph-lines absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {links.map((line, i) => (
          <path
            key={i}
            d={`M${line[0]} ${line[1]} C${line[0]} ${(line[1] + line[3]) / 2}, ${line[2]} ${(line[1] + line[3]) / 2}, ${line[2]} ${line[3]}`}
          />
        ))}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.l}
          className={`graph-node node-${node.t}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span>
            {node.l}
            <small>{node.m}</small>
          </span>
        </div>
      ))}
      <div className="graph-pulse pulse-one" aria-hidden="true" />
      <div className="graph-pulse pulse-two" aria-hidden="true" />
    </div>
  )
}
