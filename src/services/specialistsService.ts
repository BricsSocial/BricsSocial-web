import { axiosClient } from 'src/constants';
import { Components } from 'src/schema';

export type Specialist = Components.Schemas.SpecialistDto;

export class SpecialistsService {
  public static getSpecialists = async () => {
    return (await (await axiosClient).SpecialistsGet()).data;
  };
}
