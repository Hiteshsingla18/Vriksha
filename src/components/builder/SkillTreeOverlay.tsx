import LivingSkillTree from "../common/LivingSkillTree"

interface SkillTreeOverlayProps {
  targetRole: string
}

export default function SkillTreeOverlay({ targetRole }: SkillTreeOverlayProps) {
  return (
    <LivingSkillTree
      context="builder"
      targetRole={targetRole}
      currentSkills={["Python", "SQL", "Tableau", "Git"]}
      title="Tree Overlay"
      subtitle="Your lit skills vs. the live tree for your target role."
      cardLabel="01 · See the exact gap"
    />
  )
}

