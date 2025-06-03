// Function to shuffle emails at the start of each level
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Technique names mapping
export const techniqueNames = {
  urgency_scareware: "Urgency & Scareware",
  spoofing: "Email Spoofing",
  credential_harvesting: "Credential Harvesting",
  lottery_advance_fee: "Lottery/Advance Fee Fraud",
  fake_security_alert: "Fake Security Alerts",
  typosquatting: "Typosquatting",
  fake_compliance: "Fake Compliance",
} as const
