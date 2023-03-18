import { Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <h1>Welcome</h1>,
  },
];

export const HOME_ROUTE: RouteProps = {
  path: appRoutes.home.index,
  element: <Outlet />,
  childRoutes: ROUTES,
};
