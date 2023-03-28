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

  public static createVacancy = async (data: Paths.VacanciesCreate.RequestBody) => {
    return (await axiosClient).VacanciesCreate(null, data);
  };

  public static deleteVacancies = async (pathParams: Paths.VacanciesDelete.PathParameters) => {
    return (await axiosClient).VacanciesDelete(pathParams);
  };
}
