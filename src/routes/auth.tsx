import { Navigate, Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <Navigate to={appRoutes.auth.login} replace />,
  },
  {
    path: appRoutes.auth.login,
    element: <h2>Testing routing</h2>,
  },
];

export const AUTH_ROUTES: RouteProps = {
  path: appRoutes.auth.index,
  element: <Outlet />,
  childRoutes: ROUTES,
};
