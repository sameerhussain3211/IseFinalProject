import type { EnemyConfig } from "../types/game-types"

// Game dimensions
export const GAME_WIDTH = 800
export const GAME_HEIGHT = 600
export const ENEMIES_PER_LEVEL = 10

// Enemy types configuration
export const ENEMY_TYPES: Record<string, EnemyConfig> = {
  phishing: {
    name: "Phishing Drone",
    icon: "🎣",
    color: "text-yellow-400",
    health: 2,
    speed: 0.5,
    damage: 15,
  },
  ransomware: {
    name: "Ransomware Rocket",
    icon: "🚀",
    color: "text-red-400",
    health: 3,
    speed: 0.6,
    damage: 25,
  },
  ddos: {
    name: "DDoS Swarm",
    icon: "🐝",
    color: "text-purple-400",
    health: 1,
    speed: 0.8,
    damage: 10,
  },
  zeroday: {
    name: "Zero-Day Bomber",
    icon: "💣",
    color: "text-orange-400",
    health: 4,
    speed: 0.45,
    damage: 30,
  },
  malware: {
    name: "Malware Bug",
    icon: "🐛",
    color: "text-green-400",
    health: 2,
    speed: 0.55,
    damage: 20,
  },
}

// Cybersecurity tips for level completion screens
export const CYBERSECURITY_TIPS = [
  "Always verify the sender before clicking email links or downloading attachments.",
  "Keep your software and operating systems updated with the latest security patches.",
  "Use strong, unique passwords and enable two-factor authentication whenever possible.",
  "Regular backups can save you from ransomware attacks - store them offline!",
  "Be cautious of public Wi-Fi and use VPN for sensitive activities.",
]

// Defense options pool
export const DEFENSE_OPTIONS = {
  phishing: {
    correct: [
      { id: "p1", label: "Enable 2FA" },
      { id: "p2", label: "Verify Email Source" },
      { id: "p3", label: "Check URLs Before Clicking" },
      { id: "p4", label: "Use Email Filtering" },
      { id: "p5", label: "Report Suspicious Emails" },
    ],
    wrong: [
      { id: "p6", label: "Click Suspicious Links" },
      { id: "p7", label: "Share Password via Email" },
      { id: "p8", label: "Ignore Email Warnings" },
      { id: "p9", label: "Download Unknown Attachments" },
      { id: "p10", label: "Reply with Personal Information" },
      { id: "p11", label: "Disable Email Security" },
      { id: "p12", label: "Use Same Password Everywhere" },
    ],
  },
  ransomware: {
    correct: [
      { id: "r1", label: "Backup Data Regularly" },
      { id: "r2", label: "Install Security Updates" },
      { id: "r3", label: "Use Ransomware Protection" },
      { id: "r4", label: "Implement Access Controls" },
      { id: "r5", label: "Use Email Scanning" },
    ],
    wrong: [
      { id: "r6", label: "Pay Ransom Immediately" },
      { id: "r7", label: "Disable Security Software" },
      { id: "r8", label: "Ignore Warning Messages" },
      { id: "r9", label: "Open Unknown Email Attachments" },
      { id: "r10", label: "Disable System Updates" },
      { id: "r11", label: "Share Encryption Keys" },
      { id: "r12", label: "Use Outdated Software" },
    ],
  },
  ddos: {
    correct: [
      { id: "d1", label: "Install Firewall" },
      { id: "d2", label: "Enable Rate Limiting" },
      { id: "d3", label: "Use DDoS Protection Service" },
      { id: "d4", label: "Implement Traffic Filtering" },
      { id: "d5", label: "Scale Network Resources" },
    ],
    wrong: [
      { id: "d6", label: "Restart Router Only" },
      { id: "d7", label: "Disable Network Security" },
      { id: "d8", label: "Increase Bandwidth Only" },
      { id: "d9", label: "Ignore Traffic Spikes" },
      { id: "d10", label: "Turn Off All Servers" },
      { id: "d11", label: "Delete Firewall Rules" },
      { id: "d12", label: "Expose Network Ports" },
    ],
  },
  zeroday: {
    correct: [
      { id: "z1", label: "Update Software Immediately" },
      { id: "z2", label: "Apply Security Patches" },
      { id: "z3", label: "Use Intrusion Detection" },
      { id: "z4", label: "Enable Runtime Protection" },
      { id: "z5", label: "Implement Defense in Depth" },
    ],
    wrong: [
      { id: "z6", label: "Disable All Updates" },
      { id: "z7", label: "Download Suspicious Files" },
      { id: "z8", label: "Ignore Security Alerts" },
      { id: "z9", label: "Run Untrusted Code" },
      { id: "z10", label: "Disable Vulnerability Scanning" },
      { id: "z11", label: "Share Exploit Information" },
      { id: "z12", label: "Use Legacy Systems" },
    ],
  },
  malware: {
    correct: [
      { id: "m1", label: "Run Antivirus Scan" },
      { id: "m2", label: "Use Malware Protection" },
      { id: "m3", label: "Scan Downloaded Files" },
      { id: "m4", label: "Enable Real-time Protection" },
      { id: "m5", label: "Use Application Whitelisting" },
    ],
    wrong: [
      { id: "m6", label: "Download More RAM" },
      { id: "m7", label: "Disable Antivirus" },
      { id: "m8", label: "Clear Browser Cache Only" },
      { id: "m9", label: "Run Unknown Executables" },
      { id: "m10", label: "Ignore Security Warnings" },
      { id: "m11", label: "Install Pirated Software" },
      { id: "m12", label: "Click on Pop-up Ads" },
    ],
  },
}
