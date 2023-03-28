import { axiosClient } from 'src/constants';
import { Components, Paths } from 'src/schema';

export type Specialist = Components.Schemas.SpecialistDto;

export class SpecialistsService {
  public static getSpecialistsList = async () => {
    return (await (await axiosClient).SpecialistsGet()).data;
  };

  public static getSpecialist = async (params: Paths.SpecialistsGetById.PathParameters) => {
    return (await (await axiosClient).SpecialistsGetById(params)).data;
  };

  public static createVacancyRequest = async (
    input: Components.Schemas.CreateSpecialistReplyCommand,
  ) => {
    return (await axiosClient).SpecialistsCreateReply(null, input);
  };
}
