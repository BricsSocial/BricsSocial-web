import { axiosClient } from 'src/constants/api';
import { Components, Paths } from 'src/schema';

export type CurrentUser = Components.Schemas.CurrentUserDto;

export class AuthService {
  public static async login(data: Paths.AuthLogin.RequestBody) {
    return (await axiosClient).AuthLogin(null, data);
  }

  public static getCurrentAuthData = async () => {
    return (await (await axiosClient).AuthCurrent()).data;
  };
}
