import { Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { ApplicationsPage } from 'src/pages';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <ApplicationsPage />,
  },
];

export const APPLICATIONS_ROUTE: RouteProps = {
  path: appRoutes.applications.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
