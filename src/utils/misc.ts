export const fakeFetch = <T>(callback: () => T, maxDelay = 3000) =>
  new Promise<T>(res => setTimeout(() => res(callback()), Math.random() * maxDelay));
