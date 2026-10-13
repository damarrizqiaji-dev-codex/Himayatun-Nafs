import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types/report';
import { storageService } from '../services/storage';

interface RouterContextType {
  path: string;
  queryParams: Record<string, string>;
  navigate: (to: string) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  queryParams: {},
  navigate: () => {},
  currentRole: 'publik',
  switchRole: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => storageService.getCurrentRole());

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
      const params = new URLSearchParams(window.location.search);
      const res: Record<string, string> = {};
      params.forEach((v, k) => {
        res[k] = v;
      });
      setQueryParams(res);
    };

    const handleRoleUpdate = () => {
      setCurrentRole(storageService.getCurrentRole());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('role_update', handleRoleUpdate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('role_update', handleRoleUpdate);
    };
  }, []);

  const navigate = (to: string) => {
    const [pathname, search] = to.split('?');
    const targetPath = pathname || '/';

    const url = search ? `${targetPath}?${search}` : targetPath;
    window.history.pushState({}, '', url);

    setPath(targetPath);
    const params = new URLSearchParams(search || '');
    const res: Record<string, string> = {};
    params.forEach((v, k) => {
      res[k] = v;
    });
    setQueryParams(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    storageService.setCurrentRole(role);
    setCurrentRole(role);
  };

  return (
    <RouterContext.Provider value={{ path, queryParams, navigate, currentRole, switchRole }}>
      {children}
    </RouterContext.Provider>
  );
};
