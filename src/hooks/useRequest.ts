import React from 'react';

import { Nullable } from 'src/types';

export const useRequest = <T, R>(requestFn: (...args: R[]) => Promise<T>, lazy = false) => {
  const [isLoading, setIsLoading] = React.useState(!lazy);
  const [data, setData] = React.useState<Nullable<T>>();

  const makeRequest = React.useCallback(
    (...args: R[]) => {
      setIsLoading(true);
      return requestFn(...args).then(data => {
        setData(data);
        setIsLoading(false);
        return data;
      });
    },
    [requestFn],
  );

  React.useEffect(() => {
    if (!lazy) makeRequest();
  }, [lazy]);

  return {
    data,
    makeRequest,
    isLoading,
  };
};
