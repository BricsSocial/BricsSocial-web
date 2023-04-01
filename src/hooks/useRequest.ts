import React from 'react';

import _ from 'lodash';

import { Nullable } from 'src/types';

export const useRequest = <T, R extends Array<unknown>, L extends boolean>(
  requestFn: (...args: R) => Promise<T>,
  options?: Nullable<{
    lazy?: L;
    skip?: boolean;
  }>,
  ...requestArgs: L extends false ? R : Partial<R>
) => {
  const { lazy, skip } = options || {};

  const [isLoading, setIsLoading] = React.useState(!lazy);
  const [data, setData] = React.useState<Nullable<T>>();
  const [args, setArgs] = React.useState(requestArgs);

  const makeRequest = React.useCallback(
    (...args: R) => {
      if (!skip) {
        setIsLoading(true);
        return requestFn(...args)
          .then(data => {
            setData(data);
            return data;
          })
          .finally(() => setIsLoading(false));
      }
    },
    [requestFn, skip],
  );

  React.useEffect(() => {
    if (!_.isEqual(args, requestArgs)) setArgs(requestArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestArgs]);

  React.useEffect(() => {
    if (!lazy && !skip) {
      makeRequest(...(args as R));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeRequest, lazy, args, skip]);

  return {
    data,
    makeRequest,
    isLoading,
  };
};
