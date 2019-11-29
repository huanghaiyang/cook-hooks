import { act, renderHook } from '@testing-library/react-hooks';
import { useDeepComparedState } from '../useDeepComparedState';

const setUp = <T extends object>(initialState?: T) => renderHook(() => useDeepComparedState(initialState));

it('should init state and utils', () => {
  const { result } = setUp({ foo: 'bar', arr: [1, 2, 3] });
  const [state] = result.current;
  expect(state).toEqual({ foo: 'bar', arr: [1, 2, 3] })
})

it('should difference when update state', () => {
  setUp({ foo: 'bar', arr: [1, 2, 3] });
  const { result } = setUp({ foo: 'bar', arr: [1, 2, 3, 4] });
  const [state] = result.current;
  expect(state).toStrictEqual({ foo: 'bar', arr: [1, 2, 3, 4] })
})