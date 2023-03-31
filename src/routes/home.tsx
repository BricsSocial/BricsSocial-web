import { Navigate, Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { AgentAccountPage } from 'src/pages';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <Navigate to={appRoutes.specialists.index} replace />,
  },
  {
    path: appRoutes.app.account,
    element: <AgentAccountPage />,
  },
];

export const HOME_ROUTE: RouteProps = {
  path: appRoutes.app.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
