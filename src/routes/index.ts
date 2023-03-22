import { RouteProps } from 'src/types';

import { APPLICATIONS_ROUTE } from './applications';
import { AUTH_ROUTE } from './auth';
import { HOME_ROUTE } from './home';
import { RESUMES_ROUTE } from './resumes';
import { VACANCIES_ROUTE } from './vacancies';

export const APP_ROUTES: RouteProps[] = [
  HOME_ROUTE,
  AUTH_ROUTE,
  RESUMES_ROUTE,
  VACANCIES_ROUTE,
  APPLICATIONS_ROUTE,
];
