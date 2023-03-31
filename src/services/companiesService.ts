import { axiosClient } from 'src/constants';
import { Components, Paths } from 'src/schema';
import { Nullable } from 'src/types';

export type Company = Components.Schemas.CompanyDto;

export class CompaniesService {
  public static getCompany = async (id: Nullable<number>) => {
    return id ? await (await (await axiosClient).CompaniesGetById({ id })).data : null;
  };

  public static updateCompany = async (
    pathParams: Paths.CompaniesUpdate.PathParameters,
    data: Components.Schemas.UpdateCompanyCommand,
  ) => {
    return await (
      await (await axiosClient).CompaniesUpdate(pathParams, data)
    ).data;
  };
}
