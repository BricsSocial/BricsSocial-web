import { axiosClient } from 'src/constants';

export class AgentService {
  public static getCurrentAgent = async () => {
    return (await (await axiosClient).AgentsGetCurrent()).data;
  };
}
