import React from 'react';

import { Nullable } from 'src/types';

export const useRequest = <T, R extends Array<unknown>, L extends boolean>(
  requestFn: (...args: R) => Promise<T>,
  lazy?: L,
  ...requestArgs: L extends false ? R : []
) => {
  const [isLoading, setIsLoading] = React.useState(!lazy);
  const [data, setData] = React.useState<Nullable<T>>();

  const makeRequest = React.useCallback(
    (...args: R) => {
      setIsLoading(true);
      return requestFn(...args)
        .then(data => {
          setData(data);
          return data;
        })
        .finally(() => setIsLoading(false));
    },
    [requestFn],
  );

  React.useEffect(() => {
    if (!lazy) {
      makeRequest(...(requestArgs as R));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeRequest, lazy]);

  return {
    data,
    makeRequest,
    isLoading,
  };
};
