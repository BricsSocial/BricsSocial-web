import { Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { SpecialistsPage, SpecialistProfilePage } from 'src/pages';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <SpecialistsPage />,
  },
  {
    path: appRoutes.specialists.profile,
    element: <SpecialistProfilePage />,
  },
];

export const SPECIALISTS_ROUTE: RouteProps = {
  path: appRoutes.specialists.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
