import { Outlet } from 'react-router';

import { appRoutes } from 'src/constants';
import { AppLayout } from 'src/layouts';
import { VacanciesPage } from 'src/pages';
import { RouteProps } from 'src/types';

export const ROUTES: RouteProps[] = [
  {
    index: true,
    element: <VacanciesPage />,
  },
];

export const VACANCIES_ROUTE: RouteProps = {
  path: appRoutes.vacancies.index,
  element: (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  childRoutes: ROUTES,
};
