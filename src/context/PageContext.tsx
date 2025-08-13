"use client";

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { activities } from '@/lib/data';

const getTitleFromPath = (pathname: string): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Dashboard';

    const lastSegment = segments[segments.length - 1];
    
    if (segments[0] === 'activities' && segments[1] && segments[1] !== 'create') {
        const activity = activities.find(a => a.id === segments[1]);
        if (activity) {
            if (segments.length > 2) {
                 // from "some-path" to "Some Path"
                return lastSegment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            return activity.nameOfActivity;
        }
    }
    
    // from "some-path" to "Some Path"
    return lastSegment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};


interface PageContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState(getTitleFromPath(pathname));

  useEffect(() => {
    setPageTitle(getTitleFromPath(pathname));
  }, [pathname]);

  const value = useMemo(() => ({
    pageTitle,
    setPageTitle,
  }), [pageTitle]);

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
