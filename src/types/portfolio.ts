export interface HeroData {
  name: string;
  title: string;
  statusBadge: string;
  summary: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
}

export interface AboutData {
  summary: string;
  bioParagraphs: string[];
  languages: string[];
  highlights: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: 'AI & Machine Learning' | 'Full-Stack & Web' | 'Mobile & Systems' | 'Other';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  description: string;
  thumbnailUrl: string;
  certificateUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactSettings {
  recipientEmail: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  inquirySubjectPrefix: string;
  availabilityNote: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  skillCategories: SkillCategory[];
  contact: ContactSettings;
  lastUpdated: string;
}
