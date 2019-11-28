
import { useEffect, useState } from 'react'

export function useGlobalError(listenerFunction: (event: ErrorEvent) => void) {
  let [timeStamp, setTimeStamp] = useState()
  let [event, setEvent] = useState()
  function handleError(event: ErrorEvent) {
    const { timeStamp } = event
    setTimeStamp(timeStamp)
    setEvent(event)
  }
  useEffect(() => {
    listenerFunction(event);
    return () => {
      window.removeEventListener('error', handleError)
    };
  }, [timeStamp])
  window.addEventListener('error', handleError)
}