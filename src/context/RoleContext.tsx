"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';

interface RoleContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
  availableUsers: User[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const setRole = (role: UserRole) => {
    const newUser = users.find(u => u.role === role);
    if (newUser) {
      setCurrentUser(newUser);
    }
  };

  const value = useMemo(() => ({
    user: currentUser,
    role: currentUser.role,
    setRole,
    availableUsers: users,
  }), [currentUser]);

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
