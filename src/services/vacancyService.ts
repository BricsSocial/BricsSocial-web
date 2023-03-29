import { axiosClient } from 'src/constants';
import { Components, Paths } from 'src/schema';

export type VacanciesPaginatedList = Components.Schemas.PaginatedListVacancyDto;
export type Vacancy = Components.Schemas.VacancyDto;
export type VacancyReply = Components.Schemas.ReplyDto;

export class VacanciesService {
  public static getVacancies = async (
    params?: Paths.VacanciesGet.QueryParameters,
  ): Promise<VacanciesPaginatedList> => {
    return (await (await axiosClient).VacanciesGet(params)).data;
  };

  public static createVacancy = async (data: Paths.VacanciesCreate.RequestBody) => {
    return (await axiosClient).VacanciesCreate(null, data);
  };

  public static deleteVacancies = async (pathParams: Paths.VacanciesDelete.PathParameters) => {
    return (await axiosClient).VacanciesDelete(pathParams);
  };

  public static getReplies = async (params?: Paths.VacanciesGetReplies.QueryParameters) => {
    return (await (await axiosClient).VacanciesGetReplies(params)).data;
  };

  public static updateReply = async (
    params?: Paths.VacanciesUpdateReply.PathParameters,
    data?: Paths.VacanciesUpdateReply.RequestBody,
  ) => {
    return (await axiosClient).VacanciesUpdateReply(params, data);
  };
}
