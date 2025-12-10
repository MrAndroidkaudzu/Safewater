import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, SiteConfig, BlogPost, Project } from '../types';

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Bringing Clean Water to Rural Villages',
    excerpt: 'Our latest initiative in rural Malawi has successfully provided clean water access to over 500 families.',
    content: 'Water is the essence of life. Yet, for millions around the world, access to clean, safe drinking water is a daily struggle. Last month, our team embarked on a journey to remote districts where groundwater is scarce. By installing solar-powered pumps, we have ensured a sustainable supply for the next decade. The smiles on the children’s faces when they saw clean water flowing for the first time were priceless.',
    date: '2023-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=800',
    author: 'Patrick Chimphamba'
  },
  {
    id: '2',
    title: 'The Impact of Sanitation Education',
    excerpt: 'Why building wells is only half the battle. Education on hygiene is key to long-term health.',
    content: 'While infrastructure is critical, knowledge is power. We held workshops in 12 communities this month, teaching proper handwashing techniques and water storage safety. This holistic approach reduces waterborne diseases significantly.',
    date: '2023-11-02',
    imageUrl: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=800',
    author: 'Dr. Amani'
  }
];

const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Water Wheels Project',
    description: 'Distributing rolling water drums (Water Wheels) to women and children. This simple innovation allows them to transport 50 liters of water at once with minimal physical strain, replacing the heavy burden of carrying buckets on their heads.',
    imageUrl: 'https://images.unsplash.com/photo-1574482620266-b6b473187c32?auto=format&fit=crop&q=80&w=600',
    goal: 8000,
    raised: 2450
  },
  {
    id: 'p2',
    title: 'Food Sharing Program',
    description: 'Providing essential food parcels including maize, beans, and oil to the poorest families in our community. We aim to fight hunger and malnutrition, ensuring no child goes to sleep on an empty stomach.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600',
    goal: 12000,
    raised: 5600
  },
  {
    id: 'p3',
    title: 'HIV/AIDS Support',
    description: 'Offering relief aid, nutritional support, and counseling services to individuals and families affected by HIV/AIDS. We work to improve their quality of life and reduce the stigma surrounding the disease.',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600',
    goal: 15000,
    raised: 8900
  },
  {
    id: 'p4',
    title: 'Community Clinic Construction',
    description: 'Building and equipping a rural community clinic to provide immediate medical care, maternity services, and disease treatment to villagers who currently travel miles for basic health needs.',
    imageUrl: 'https://images.unsplash.com/photo-1516574187841-693018950317?auto=format&fit=crop&q=80&w=600',
    goal: 45000,
    raised: 12500
  }
];

const defaultConfig: SiteConfig = {
  theme: {
    primaryColor: '#0ea5e9', // Sky blue
    secondaryColor: '#0f172a', // Slate 900
    surfaceColor: '#ffffff',
    textColor: '#334155',
  },
  branding: {
    name: 'Safe Water Organisation',
    logoUrl: '',
    tagline: 'Providing Good Health To The Community',
  },
  seo: {
    metaTitle: 'Safe Water Organisation | Malawi',
    metaDescription: 'Helping communities access clean water and health support. Founded by Patrick Chimphamba in 2004.',
  },
  contact: {
    email: 'Safewaterorg@gmail.com',
    phone: '0999 29 54 85 / 0999 17 89 16',
    address: 'Malawi',
  },
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/265999295485',
  },
  content: {
    heroTitle: 'Clean Water & Good Health for All',
    heroSubtitle: 'Founded in 2004 to alleviate suffering in rural communities through safe water access, HIV/AIDS support, and healthcare.',
    heroButtonText: 'Support Our Cause',
    heroImage: 'https://images.unsplash.com/photo-1541913299752-59f5b69f6609?auto=format&fit=crop&q=80&w=1600',
    aboutTitle: 'About Our Mission',
    aboutText: 'Safe Water Organisation was founded by Larry Siegel in 2004 and handed over to Patrick Chimphamba in 2022. Rooted in humanitarian principles, we strive to alleviate suffering in rural communities through safe water access and health support.',
    aboutImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    missionTitle: 'Our Core Aims',
    missionText: 'We aim to provide safe water in rural areas, offer relief aid to people living with HIV/AIDS, provide healthcare and counseling, and fight poverty by empowering the community.',
    footerText: '© 2024 Safe Water Organisation. Founded 2004. Based in Malawi.',
    newsletterTitle: 'Stay Connected',
    newsletterText: 'Subscribe to receive updates on our projects, plans, and impact stories.',
  }
};

const SiteContext = createContext<AppContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children?: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  // Load from local storage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    const savedPosts = localStorage.getItem('sitePosts');
    const savedProjects = localStorage.getItem('siteProjects');
    const savedAdmin = localStorage.getItem('siteAdmin');
    
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('sitePosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('siteProjects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('siteAdmin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const toggleAdmin = () => setIsAdmin(prev => !prev);

  const updateConfig = (section: keyof SiteConfig, data: Partial<SiteConfig[keyof SiteConfig]>) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateContent = (key: keyof SiteConfig['content'], value: string) => {
    setConfig(prev => ({
      ...prev,
      content: { ...prev.content, [key]: value }
    }));
  };

  const addPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = { ...postData, id: Date.now().toString() };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (updatedPost: BlogPost) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  return (
    <SiteContext.Provider value={{
      isAdmin,
      toggleAdmin,
      config,
      updateConfig,
      updateContent,
      posts,
      addPost,
      updatePost,
      deletePost,
      projects,
      updateProject
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
};