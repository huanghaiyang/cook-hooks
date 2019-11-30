import { useMountedState } from 'react-use';
import { useCallback } from 'react';

export type UseWaterfall = () => (wrappedPromises: ((param?: any) => Promise<any>)[]) => Promise<any>;

const useWaterfall: UseWaterfall = () => {
  const isMounted = useMountedState();
  return useCallback((wrappedPromises: ((param?: any) => Promise<any>)[]) => {
    return new Promise<any>((resolve, reject) => {
      if (!wrappedPromises.length) resolve();
      const onError = (error: Error) => {
        isMounted() && reject(error);
      };
      let taskIndex = 0;
      function nextTask(previousResult?: any) {
        if (taskIndex === wrappedPromises.length) {
          isMounted && resolve(previousResult);
          return;
        }
        const task = wrappedPromises[taskIndex++];
        task(previousResult).then(result => nextTask(result), onError);
      }
      nextTask();
    });
  }, []);
};

export default useWaterfall;
