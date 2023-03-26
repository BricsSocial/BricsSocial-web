import { axiosClient } from 'src/constants';
import { Components, Paths } from 'src/schema';

export type VacanciesPaginatedList = Components.Schemas.PaginatedListVacancyDto;
export type Vacancy = Components.Schemas.VacancyDto;

export class VacanciesService {
  public static getVacancies = async (
    params: Paths.VacanciesGet.QueryParameters,
  ): Promise<VacanciesPaginatedList> => {
    return (await (await axiosClient).VacanciesGet(params)).data;
  };
}
