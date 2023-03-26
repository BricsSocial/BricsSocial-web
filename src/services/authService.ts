import { axiosClient } from 'src/constants/api';
import { Paths } from 'src/schema';

export class AuthService {
  public static async login(data: Paths.AuthLogin.RequestBody) {
    return (await axiosClient).AuthLogin(null, data);
  }

  public static getCurrentAuthData = async () => {
    return (await axiosClient).AuthCurrent();
  };
}
