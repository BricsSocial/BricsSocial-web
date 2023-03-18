import { Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { ResumePage } from 'src/pages/ResumesPage';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <ResumePage />,
  },
];

export const RESUMES_ROUTE: RouteProps = {
  path: appRoutes.resumes.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
