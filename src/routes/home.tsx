import { Navigate, Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <Navigate to={appRoutes.specialists.index} replace />,
  },
];

export const HOME_ROUTE: RouteProps = {
  path: appRoutes.home.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
