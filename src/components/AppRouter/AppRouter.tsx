import React from 'react';

import { Route, Routes } from 'react-router';

import { NotFoundPage } from 'src/pages';
import { APP_ROUTES } from 'src/routes';
import { RouteProps } from 'src/types';
import { Nullable } from 'src/types';
import { traverseRoutesTree } from 'src/utils';

const renderNestedRoutes = (routesProps: RouteProps[] = []) => {
  const renderRouteContent = (routeProps: Nullable<RouteProps>) => {
    if (!routeProps) return null;

    const { element, childRoutes, index, ...restProps } = routeProps;

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Route index={index as any} key={routeProps.path || 'index'} element={element} {...restProps}>
        {!index && renderNestedRoutes(childRoutes)}
      </Route>
    );
  };

  return routesProps.map(renderRouteContent);
};

export const AppRouter: React.FC = () => {
  const routes = React.useMemo(() => traverseRoutesTree(APP_ROUTES), []);

  return (
    <Routes>
      {renderNestedRoutes(routes)}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
