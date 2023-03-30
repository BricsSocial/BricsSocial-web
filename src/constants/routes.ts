import { RouterPathParam } from './router';

export const home = {
  index: '/',
};

export const auth = {
  index: '/auth',
  signin: '/auth/signin',
  signup: '/auth/signup',
} as const;

export const specialists = {
  index: '/specialists',
  profile: `/specialists/:${RouterPathParam.specialistId}`,
};

export const vacancies = {
  index: '/vacancies',
  profile: `/vacancies/:${RouterPathParam.vacancyId}`,
};

export const replies = {
  index: '/replies',
};
