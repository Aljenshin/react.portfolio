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
  className?: string;
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

// Admin System Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string; // In real app, this would be hashed
  createdAt: Date;
}

export interface Message {
  id: string;
  visitorName: string;
  visitorEmail?: string;
  subject?: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  conversationId: string;
}

export interface Conversation {
  id: string;
  visitorName: string;
  visitorEmail?: string;
  subject?: string;
  messages: Message[];
  lastMessageAt: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Reply {
  id: string;
  conversationId: string;
  message: string;
  isFromAdmin: boolean;
  timestamp: Date;
  adminId?: string;
}
