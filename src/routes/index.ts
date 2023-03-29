import { RouteProps } from 'src/types';

import { AUTH_ROUTE } from './auth';
import { HOME_ROUTE } from './home';
import { REPLIES_ROUTE } from './replies';
import { SPECIALISTS_ROUTE } from './specialists';
import { VACANCIES_ROUTE } from './vacancies';

export const APP_ROUTES: RouteProps[] = [
  HOME_ROUTE,
  AUTH_ROUTE,
  SPECIALISTS_ROUTE,
  VACANCIES_ROUTE,
  REPLIES_ROUTE,
];
