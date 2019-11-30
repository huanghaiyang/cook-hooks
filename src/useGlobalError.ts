import { useEffect, useState } from 'react';

export function useGlobalError<T extends ErrorEvent>(listenerFunction: (event: T) => void) {
  const [timeStamp, setTimeStamp] = useState();
  const [event, setEvent] = useState();
  function handleError(errorEvent: ErrorEvent): void {
    const { timeStamp: time } = errorEvent;
    setTimeStamp(time);
    setEvent(errorEvent);
  }
  useEffect(() => {
    listenerFunction(event);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [timeStamp]);
  window.addEventListener('error', handleError);
}
