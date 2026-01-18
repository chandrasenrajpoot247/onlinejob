
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, SiteSettings, StaticPage, Blog } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

interface AppContextType {
  posts: Post[];
  settings: SiteSettings;
  pages: StaticPage[];
  blogs: Blog[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  setPages: React.Dispatch<React.SetStateAction<StaticPage[]>>;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  totalViews: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('sarkari_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sarkari_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [pages, setPages] = useState<StaticPage[]>(() => {
    const saved = localStorage.getItem('sarkari_pages');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'About Us', slug: 'about-us', content: 'आपका स्वागत है Sarkari AI Pro पर...' },
      { id: '2', title: 'Disclaimer', slug: 'disclaimer', content: 'यहाँ दी गई जानकारी केवल सूचनात्मक उद्देश्यों के लिए है...' }
    ];
  });

  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('sarkari_blogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('sarkari_total_views');
    return saved ? parseInt(saved, 10) : 124050; // Starting with a professional base number
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('sarkari_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sarkari_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sarkari_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('sarkari_blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Track visitor count on mount (simulated for client-side)
  useEffect(() => {
    const newCount = totalViews + 1;
    setTotalViews(newCount);
    localStorage.setItem('sarkari_total_views', newCount.toString());
  }, []);

  // Apply copy protection
  useEffect(() => {
    if (settings.copyProtection) {
      document.body.classList.add('no-select');
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      window.addEventListener('contextmenu', handleContextMenu);
      return () => {
        document.body.classList.remove('no-select');
        window.removeEventListener('contextmenu', handleContextMenu);
      };
    } else {
      document.body.classList.remove('no-select');
    }
  }, [settings.copyProtection]);

  return (
    <AppContext.Provider value={{
      posts, setPosts,
      settings, setSettings,
      pages, setPages,
      blogs, setBlogs,
      isAdmin, setIsAdmin,
      totalViews
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
