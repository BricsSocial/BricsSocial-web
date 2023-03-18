import { RouteProps } from 'src/types';

import { AUTH_ROUTE } from './auth';
import { HOME_ROUTE } from './home';
import { RESUMES_ROUTE } from './resumes';

export const APP_ROUTES: RouteProps[] = [HOME_ROUTE, AUTH_ROUTE, RESUMES_ROUTE];
