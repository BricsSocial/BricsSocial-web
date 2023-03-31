import OpenAPIClientAxios from 'openapi-client-axios';

import { Client } from 'src/schema';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'accessToken';

export enum UserRole {
  Administrator = 'Administrator',
  Agent = 'Agent',
}

const api = new OpenAPIClientAxios({
  axiosConfigDefaults: {
    baseURL: BASE_API_URL,
  },
  definition: `${BASE_API_URL}/swagger/v1/swagger.json`,
});
api.init();

export const axiosClient = api.getClient<Client>().then(client => {
  client.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
      )}`;
      return config;
    },
    console.log,
    { synchronous: false },
  );
  return client;
});
