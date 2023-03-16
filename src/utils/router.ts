import { RouteProps } from 'src/types';

export const traverseRoutesTree = (routesTree: RouteProps[]): RouteProps[] => {
  const depth = 0;

  const routesTreeWalker = (routesTree: RouteProps[] = [], depth: number): RouteProps[] => {
    if (!routesTree) return [];

    return routesTree.map(route => {
      return {
        ...route,
        element: route.element,
        childRoutes: routesTreeWalker(route.childRoutes, depth + 1),
      };
    });
  };

  return routesTreeWalker(routesTree, depth);
};
