export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
}

export interface SiteConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    surfaceColor: string;
    textColor: string;
  };
  branding: {
    name: string;
    logoUrl: string; // Used for nav branding
    tagline: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    heroImage: string;
    aboutTitle: string;
    aboutText: string;
    aboutImage: string;
    missionTitle: string;
    missionText: string;
    footerText: string;
    newsletterTitle: string;
    newsletterText: string;
  };
}

export interface AppContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  config: SiteConfig;
  updateConfig: (section: keyof SiteConfig, data: Partial<SiteConfig[keyof SiteConfig]>) => void;
  updateContent: (key: keyof SiteConfig['content'], value: string) => void;
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  projects: Project[];
  updateProject: (project: Project) => void;
}