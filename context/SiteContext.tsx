import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, SiteConfig, Project } from '../types';

const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Water Wheels Project',
    description: 'Distributing rolling water drums (Water Wheels) to women and children. This simple innovation allows them to transport 50 liters of water at once with minimal physical strain, replacing the heavy burden of carrying buckets on their heads.',
    imageUrl: 'https://images.unsplash.com/photo-1573062363102-14eb58c67923?auto=format&fit=crop&q=80&w=600', // Woman carrying water
    goal: 8000,
    raised: 2450
  },
  {
    id: 'p2',
    title: 'Food Sharing Program',
    description: 'Providing essential food parcels including maize, beans, and oil to the poorest families in our community. We aim to fight hunger and malnutrition, ensuring no child goes to sleep on an empty stomach.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600', // Smiling African child
    goal: 12000,
    raised: 5600
  },
  {
    id: 'p3',
    title: 'HIV/AIDS Support',
    description: 'Offering relief aid, nutritional support, and counseling services to individuals and families affected by HIV/AIDS. We work to improve their quality of life and reduce the stigma surrounding the disease.',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600', // Community support / Elderly
    goal: 15000,
    raised: 8900
  },
  {
    id: 'p4',
    title: 'Community Clinic Construction',
    description: 'Building and equipping a rural community clinic to provide immediate medical care, maternity services, and disease treatment to villagers who currently travel miles for basic health needs.',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&q=80&w=600', // Community gathering / Medical context
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
    heroImage: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=1600', // People carrying yellow containers on dirt road
    aboutTitle: 'About Our Mission',
    aboutText: 'Safe Water Organisation was founded by Larry Siegel in 2004 and handed over to Patrick Chimphamba in 2022. Rooted in humanitarian principles, we strive to alleviate suffering in rural communities through safe water access and health support.',
    aboutImage: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800', // African woman portrait
    missionTitle: 'Our Core Aims',
    missionText: 'We aim to provide safe water in rural areas, offer relief aid to people living with HIV/AIDS, provide healthcare and counseling, and fight poverty by empowering the community.',
    footerText: '© 2024 Safe Water Organisation. Founded 2004. Based in Malawi.',
    newsletterTitle: 'Stay Connected',
    newsletterText: 'Subscribe to receive updates on our projects, plans, and impact stories.',
  }
};

const SiteContext = createContext<AppContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children?: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  // Load from local storage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    const savedProjects = localStorage.getItem('siteProjects');
    
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('siteProjects', JSON.stringify(projects));
  }, [projects]);

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

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  return (
    <SiteContext.Provider value={{
      config,
      updateConfig,
      updateContent,
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