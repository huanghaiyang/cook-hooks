import _ from 'lodash';
import { useState } from 'react';

export function useDeepComparedState<S>(initialState: (() => S) | S) {
  const [value, setValue] = useState(initialState)
  let [change, setChange] = useState(false)
  return [value, function (newState: (() => S) | S): void {
    if (newState instanceof Function) {
      newState = newState();
    }
    if (!_.isEqual(value, newState)) {
      setValue(newState);
      setChange(Math.random())
    }
  }]
}