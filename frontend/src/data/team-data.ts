export interface VerifiedTeamMember {
  id: string | number;
  name: string;
  role: string;
  badge: string;
  bio: string;
  skills: string[];
  photo?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    mail?: string;
  };
  featured: boolean;
  isActive: boolean;
  order: number;
}

// ONLY authentic, verified Royal Business Machine team members.
// Fictional profiles (e.g. A. Sterling, Sarah Chen, Marcus Johnson, Elena Rodriguez, David Kim) are strictly excluded.
export const VERIFIED_TEAM_MEMBERS: VerifiedTeamMember[] = [
  {
    id: "tm-pavitra-arora",
    name: "Pavitra Arora",
    role: "Founder & Chief Executive Officer",
    badge: "Executive Leadership",
    bio: "Entrepreneur building India's integrated business infrastructure platform. 6+ years driving enterprise deployments, government college portals, and creator of NyayaSetu & Dairy Muneem.",
    skills: [
      "Business Strategy",
      "Institutional Execution",
      "SaaS Product Architecture",
      "Venture Growth",
      "High-Concurrency Systems",
    ],
    photo: "/assets/company/logo-symbol.png",
    socials: {
      linkedin: "https://www.linkedin.com/company/royal-business-machine",
      twitter: "https://twitter.com/royalbizmachine",
      mail: "mailto:royalbusinessmachine@gmail.com",
    },
    featured: true,
    isActive: true,
    order: 1,
  },
];
