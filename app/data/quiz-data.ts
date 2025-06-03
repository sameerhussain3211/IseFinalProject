// Define the QuizQuestion interface
export interface QuizQuestion {
  id: number
  topic: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// Quiz questions organized by topic
export const quizQuestions: QuizQuestion[] = [
  // Phishing, Malware, Ransomware
  {
    id: 1,
    topic: "Phishing & Malware",
    question: "What is the primary goal of a phishing attack?",
    options: [
      "To install malware on a system",
      "To steal sensitive information like passwords and credit card details",
      "To encrypt files for ransom",
      "To test a company's security awareness",
    ],
    correctAnswer: 1,
    explanation:
      "Phishing attacks primarily aim to trick users into revealing sensitive information such as passwords, credit card numbers, or personal data by masquerading as trustworthy entities.",
  },
  {
    id: 2,
    topic: "Phishing & Malware",
    question: "Which of the following is NOT a common sign of a phishing email?",
    options: [
      "Urgent calls to action",
      "Spelling and grammatical errors",
      "Requests for personal information",
      "Personalized greeting with your full name",
    ],
    correctAnswer: 3,
    explanation:
      "Legitimate emails often include personalized greetings with your name. Phishing emails typically use generic greetings like 'Dear Customer' because attackers usually don't have your personal details.",
  },
  {
    id: 3,
    topic: "Phishing & Malware",
    question: "What type of malware locks your files and demands payment for their release?",
    options: ["Spyware", "Adware", "Ransomware", "Worm"],
    correctAnswer: 2,
    explanation:
      "Ransomware is a type of malicious software that encrypts a victim's files and demands payment (usually in cryptocurrency) to restore access to the data.",
  },

  // Password Hygiene
  {
    id: 4,
    topic: "Password Hygiene",
    question: "Which of the following is the MOST secure password?",
    options: ["Password123!", "qwerty12345", "P@$$w0rd", "Tr7&9*Kp2#zL"],
    correctAnswer: 3,
    explanation:
      "The strongest passwords are long, complex, and include a mix of uppercase and lowercase letters, numbers, and special characters without forming recognizable words or patterns.",
  },
  {
    id: 5,
    topic: "Password Hygiene",
    question: "What is a password manager?",
    options: [
      "A person who manages passwords for a company",
      "A software tool that stores and manages passwords securely",
      "A feature in web browsers that automatically fills in passwords",
      "A hardware device that generates one-time passwords",
    ],
    correctAnswer: 1,
    explanation:
      "A password manager is a software application designed to store and manage online credentials securely. It generates, retrieves, and keeps track of complex passwords, allowing users to maintain different passwords for different accounts without having to remember them.",
  },

  // Network Security
  {
    id: 6,
    topic: "Network Security",
    question: "What does HTTPS stand for?",
    options: [
      "Hypertext Transfer Protocol Secure",
      "Hypertext Transfer Protocol Standard",
      "Hypertext Transfer Protocol Service",
      "Hypertext Transfer Protocol Simple",
    ],
    correctAnswer: 0,
    explanation:
      "HTTPS (Hypertext Transfer Protocol Secure) is an extension of HTTP that uses encryption for secure communication over a computer network. It provides authentication of the website and protection of the privacy and integrity of exchanged data.",
  },
  {
    id: 7,
    topic: "Network Security",
    question: "What is a 'man-in-the-middle' attack?",
    options: [
      "When a hacker physically positions themselves between two users",
      "When a hacker secretly relays and possibly alters communication between two parties",
      "When a hacker uses social engineering to manipulate someone in IT",
      "When a hacker attacks a network from multiple locations simultaneously",
    ],
    correctAnswer: 1,
    explanation:
      "A man-in-the-middle attack occurs when an attacker secretly intercepts and relays messages between two parties who believe they are communicating directly with each other. This allows the attacker to eavesdrop on, modify, or inject new messages into the communication.",
  },

  // Social Engineering
  {
    id: 8,
    topic: "Social Engineering",
    question: "What is 'pretexting' in social engineering?",
    options: [
      "Creating a fabricated scenario to obtain information",
      "Sending text messages with malicious links",
      "Pretending to be a technical support representative",
      "Using pre-written scripts for phone scams",
    ],
    correctAnswer: 0,
    explanation:
      "Pretexting is a form of social engineering where an attacker creates a fabricated scenario (a pretext) to engage a victim and gain their trust, ultimately leading them to divulge information or perform actions that compromise security.",
  },
  {
    id: 9,
    topic: "Social Engineering",
    question: "Which of the following is NOT a common social engineering technique?",
    options: ["Baiting", "Tailgating", "Quantum phishing", "Quid pro quo"],
    correctAnswer: 2,
    explanation:
      "'Quantum phishing' is not a real social engineering technique. Common techniques include baiting (offering something enticing), tailgating (following someone into a secure area), and quid pro quo (offering a service in exchange for information).",
  },

  // Cryptography
  {
    id: 10,
    topic: "Cryptography",
    question: "What is the difference between symmetric and asymmetric encryption?",
    options: [
      "Symmetric encryption is more secure than asymmetric encryption",
      "Symmetric encryption uses one key for both encryption and decryption, while asymmetric uses different keys",
      "Symmetric encryption is only used for text, while asymmetric is used for binary data",
      "Symmetric encryption is older and obsolete, while asymmetric is modern",
    ],
    correctAnswer: 1,
    explanation:
      "Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys: a public key for encryption and a private key for decryption. Each has different use cases and security implications.",
  },

  // Two-Factor Authentication
  {
    id: 11,
    topic: "Two-Factor Authentication",
    question: "Which of the following is NOT typically used as a second factor in 2FA?",
    options: [
      "Something you know (like a password)",
      "Something you have (like a phone)",
      "Something you are (like a fingerprint)",
      "Someone you know (like a reference)",
    ],
    correctAnswer: 3,
    explanation:
      "Two-factor authentication typically uses combinations of: something you know (password/PIN), something you have (phone/security key), and something you are (biometrics). 'Someone you know' is not a standard authentication factor.",
  },
  {
    id: 12,
    topic: "Two-Factor Authentication",
    question: "Why is SMS-based two-factor authentication considered less secure than app-based authentication?",
    options: [
      "SMS messages can be intercepted or redirected",
      "SMS is more expensive to implement",
      "SMS is slower to deliver codes",
      "SMS requires a cellular connection",
    ],
    correctAnswer: 0,
    explanation:
      "SMS-based 2FA is vulnerable to SIM swapping attacks, where attackers convince carriers to transfer a victim's phone number to a new SIM. SMS messages can also be intercepted through various technical means, making app-based authenticators (which generate codes locally) more secure.",
  },

  // Firewall and VPNs
  {
    id: 13,
    topic: "Firewalls & VPNs",
    question: "What is the primary function of a firewall?",
    options: [
      "To encrypt internet traffic",
      "To monitor network performance",
      "To filter network traffic based on security rules",
      "To accelerate internet connection speeds",
    ],
    correctAnswer: 2,
    explanation:
      "A firewall's primary function is to monitor and filter incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between a trusted network and untrusted networks.",
  },
  {
    id: 14,
    topic: "Firewalls & VPNs",
    question: "What does VPN stand for?",
    options: [
      "Virtual Private Network",
      "Virtual Public Network",
      "Virtual Protected Network",
      "Virtual Personal Network",
    ],
    correctAnswer: 0,
    explanation:
      "VPN stands for Virtual Private Network. It creates an encrypted connection over a less secure network, providing secure access to a private network and protecting your online activity from eavesdropping.",
  },

  // Cyber Laws and Ethics
  {
    id: 15,
    topic: "Cyber Laws & Ethics",
    question: "What does GDPR stand for?",
    options: [
      "General Data Protection Regulation",
      "Global Data Privacy Rules",
      "General Digital Privacy Rights",
      "Government Data Protection Requirements",
    ],
    correctAnswer: 0,
    explanation:
      "GDPR stands for General Data Protection Regulation. It's a regulation in EU law on data protection and privacy that gives individuals control over their personal data and simplifies the regulatory environment for international business.",
  },
  {
    id: 16,
    topic: "Cyber Laws & Ethics",
    question: "What is 'responsible disclosure' in cybersecurity?",
    options: [
      "When a company publicly announces all security breaches immediately",
      "When security researchers notify vendors of vulnerabilities before public disclosure",
      "When companies share breach information with law enforcement only",
      "When users are required to disclose their identity before accessing secure systems",
    ],
    correctAnswer: 1,
    explanation:
      "Responsible disclosure is a practice where security researchers privately notify vendors of vulnerabilities, giving them time to develop and release patches before publicly disclosing the issues. This approach balances security awareness with the need to protect users from unpatched vulnerabilities.",
  },
]
