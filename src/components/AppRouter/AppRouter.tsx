import React from 'react';

import { Route, Routes, Navigate, matchPath, useLocation } from 'react-router-dom';

import { appRoutes } from 'src/constants';
import { useAuth, useRoutes } from 'src/hooks';
import { NotFoundPage } from 'src/pages';
import { APP_ROUTES } from 'src/routes';
import { RouteProps } from 'src/types';
import { Nullable } from 'src/types';

const renderNestedRoutes = (routesProps: RouteProps[] = []) => {
  const renderRouteContent = (routeProps: Nullable<RouteProps>) => {
    if (!routeProps) return null;

    const { element, childRoutes, index, ...restProps } = routeProps;

    return (
      <Route index={index as any} key={routeProps.path || 'index'} element={element} {...restProps}>
        {!index && renderNestedRoutes(childRoutes)}
      </Route>
    );
  };

  return routesProps.map(renderRouteContent);
};

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const routes = useRoutes(APP_ROUTES);

  const location = useLocation();

  if (!matchPath({ path: appRoutes.auth.index, end: false }, location.pathname) && !isAuthenticated)
    return <Navigate to={appRoutes.auth.index} replace />;

  return (
    <Routes>
      {renderNestedRoutes(routes)}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
