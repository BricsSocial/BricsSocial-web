import React from 'react';

import { useNavigate } from 'react-router';

import { appRoutes } from 'src/constants';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, UserRole } from 'src/constants/api';
import { useNotifications } from 'src/hooks';
import { Paths } from 'src/schema';
import { AuthService } from 'src/services/authService';
import { Nullable } from 'src/types';

export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: Nullable<UserRole>;
  signIn: (loginData: Paths.AuthLogin.RequestBody) => Promise<boolean>;
  logout: () => void;
  // signUp: (data: components['schemas']['CreateAgentCommand']) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  signIn: async () => false,
  logout: () => null,
  // signUp: () => null,
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { spawnNotification } = useNotifications();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY),
  );
  const [userRole, setUserRole] = React.useState<Nullable<UserRole>>();

  const signIn: AuthContextType['signIn'] = async loginData => {
    try {
      const { data } = await AuthService.login(loginData);
      console.log('test');
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data?.token || '');
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      spawnNotification(error.message, 'error');
    }

    return false;
  };

  const logout: AuthContextType['logout'] = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    setIsAuthenticated(false);
    setUserRole(null);
    navigate(appRoutes.auth.index);
  };

  React.useEffect(() => {
    // FIXME: Display full-size loading screen while getting this data
    if (isAuthenticated) {
      (async () => {
        try {
          const { data } = await AuthService.getCurrentAuthData();
          setUserRole(data.role as UserRole);
        } catch (error: any) {
          logout();
          spawnNotification(error.message, 'error');
        }
      })();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
