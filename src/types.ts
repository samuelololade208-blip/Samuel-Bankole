export type ThemeMode = 'light' | 'dark';

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  client?: string;
  year?: string;
  role?: string;
  deliverables?: string[];
  link?: string;
  isCustom?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  detailedDescription?: string;
  features: string[];
  startingPrice?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}
