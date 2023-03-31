import React from 'react';

import _ from 'lodash';

import { Nullable } from 'src/types';

export const useRequest = <T, R extends Array<unknown>, L extends boolean>(
  requestFn: (...args: R) => Promise<T>,
  lazy?: L,
  ...requestArgs: L extends false ? R : []
) => {
  const [isLoading, setIsLoading] = React.useState(!lazy);
  const [data, setData] = React.useState<Nullable<T>>();
  const [args, setArgs] = React.useState(requestArgs);

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
    if (!_.isEqual(args, requestArgs)) setArgs(requestArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestArgs]);

  React.useEffect(() => {
    if (!lazy) {
      makeRequest(...(args as R));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeRequest, lazy, args]);

  return {
    data,
    makeRequest,
    isLoading,
  };
};
