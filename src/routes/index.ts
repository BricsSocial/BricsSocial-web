import { RouteProps } from 'src/types';

import { APPLICATIONS_ROUTE } from './applications';
import { AUTH_ROUTE } from './auth';
import { HOME_ROUTE } from './home';
import { SPECIALISTS_ROUTE } from './specialists';
import { VACANCIES_ROUTE } from './vacancies';

export const APP_ROUTES: RouteProps[] = [
  HOME_ROUTE,
  AUTH_ROUTE,
  SPECIALISTS_ROUTE,
  VACANCIES_ROUTE,
  APPLICATIONS_ROUTE,
];
