import _ from 'lodash';
import { useState } from 'react';

export function useDeepComparedState<S>(initialState: (() => S) | S) {
  const [value, setValue] = useState(initialState);
  const [change, setChange] = useState(0);
  return [
    value,
    (newState: (() => S) | S) => {
      if (newState instanceof Function) {
        newState = newState();
      }
      if (!_.isEqual(value, newState)) {
        setValue(newState);
        setChange(Math.random());
      }
    },
  ];
}
