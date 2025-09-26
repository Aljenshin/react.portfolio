export interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export interface InfoRowProps {
  label: string;
  value: string;
  href?: string;
}

export interface PillProps {
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
}

export interface ProfileImageProps {
  src?: string | null;
  alt: string;
  fallback: string;
}

export interface WorkExperienceData {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface EducationData {
  degree: string;
  school: string;
  period: string;
  location?: string;
  description?: string;
  skills?: string[];
}

export interface Hobby {
  title: string;
  description: string;
  tags: string[];
}
