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

  public static getVacancy = async (id: number) => {
    return (await (await axiosClient).VacanciesGetById({ id })).data;
  };

  public static createVacancy = async (data: Paths.VacanciesCreate.RequestBody) => {
    return (await axiosClient).VacanciesCreate(null, data);
  };

  public static updateVacancy = async (
    pathParams: Paths.VacanciesUpdate.PathParameters,
    data: Components.Schemas.UpdateVacancyCommand,
  ) => {
    return (await (await axiosClient).VacanciesUpdate(pathParams, data)).data;
  };

  public static deleteVacancies = async (pathParams: Paths.VacanciesDelete.PathParameters) => {
    return (await axiosClient).VacanciesDelete(pathParams);
  };

  public static getReplies = async (queryParams?: Paths.VacanciesGetReplies.QueryParameters) => {
    return (await (await axiosClient).VacanciesGetReplies(queryParams)).data;
  };

  public static updateReply = async (
    params?: Paths.VacanciesUpdateReply.PathParameters,
    data?: Paths.VacanciesUpdateReply.RequestBody,
  ) => {
    return (await axiosClient).VacanciesUpdateReply(params, data);
  };
}
