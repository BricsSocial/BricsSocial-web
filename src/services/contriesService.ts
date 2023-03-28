import { axiosClient } from 'src/constants';

export class CountriesService {
  public static getContries = async () => {
    return (await (await axiosClient).CountriesGet()).data;
  };
}
