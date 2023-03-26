import { axiosClient } from 'src/constants';
import { Components } from 'src/schema';

export type VacanciesPaginatedList = Components.Schemas.PaginatedListVacancyDto;
export type Vacancy = Components.Schemas.VacancyDto;

export class VacanciesService {
  public static getVacancies = async (): Promise<VacanciesPaginatedList> => {
    return (await (await axiosClient).VacanciesGet()).data;
  };
}