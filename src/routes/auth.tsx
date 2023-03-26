import { Navigate, Outlet } from 'react-router';

import { appRoutes, RouteAccessType } from 'src/constants';
import { AuthLayout } from 'src/layouts';
import { SignInPage, SignUpPage } from 'src/pages';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <Navigate to={appRoutes.auth.signin} replace />,
    accessRoles: [RouteAccessType.unauthorized],
  },
  {
    path: appRoutes.auth.signin,
    element: <SignInPage />,
    accessRoles: [RouteAccessType.unauthorized],
  },
  {
    path: appRoutes.auth.signup,
    element: <SignUpPage />,
    accessRoles: [RouteAccessType.unauthorized],
  },
];

export const AUTH_ROUTE: RouteProps = {
  path: appRoutes.auth.index,
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  childRoutes: ROUTES,
  accessRoles: [RouteAccessType.unauthorized],
};
