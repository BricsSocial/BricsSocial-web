import { faker } from '@faker-js/faker';

import { components } from 'src/schema';
import { fakeFetch } from 'src/utils';

const createRandomSkilltag = (): components['schemas']['SkillTagDto'] => ({
  id: faker.datatype.number(),
  name: faker.hacker.noun(),
});

const createRandomVacancy = (): components['schemas']['VacancyDto'] => ({
  id: faker.datatype.number(),
  name: faker.helpers.arrayElement([
    'Frontend Developer',
    'Backend Developer',
    'UI Designer',
    'UX Designer',
  ]),
  requirements: faker.lorem.lines(2),
  offerings: faker.lorem.lines(2),
  status: faker.helpers.arrayElement([0, 1]),
  companyId: faker.datatype.number(),
  skillTags: new Array(faker.datatype.number({ min: 1, max: 5 }))
    .fill(null)
    .map(createRandomSkilltag),
});

export const getVacancies = async () => {
  return await fakeFetch(() =>
    new Array(faker.datatype.number({ min: 5, max: 10 })).fill(null).map(createRandomVacancy),
  );
};
