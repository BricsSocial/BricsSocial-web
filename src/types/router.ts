import type { RouteProps as OriginalRouteProps } from 'react-router-dom';

import type { RouteAccessType } from 'src/constants';

export type RouteProps = Omit<OriginalRouteProps, 'children'> & {
  childRoutes?: RouteProps[];
  accessRoles?: RouteAccessType[];
};
