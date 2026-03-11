
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  image?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface PortfolioData {
  basics: {
    name: string;
    title: string;
    email: string;
    bio: string;
    location: string;
    github?: string;
    linkedin?: string;
    avatar?: string;
  };
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: string[];
}

export type ThemeType = 'modern' | 'minimal' | 'cyber' | 'corporate';

export interface AppState {
  portfolio: PortfolioData;
  activeTheme: ThemeType;
}
