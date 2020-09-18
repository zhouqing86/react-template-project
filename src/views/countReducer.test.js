/* eslint-disable */
import reducer from './countReducer';
import { decrement, increment } from './countReducer';
describe('countReducer', () => {
  describe('#increment', () => {
    const initialState = {
      count: 1,
    };
    it('should increment the count with the initial state', () => {
      const state = reducer(initialState, increment());
      expect(state.count).toEqual(2);
    });

    it('should increment the count based on the default value', () => {
      const state = reducer(undefined, increment());
      expect(state.count).toEqual(1);
    });
  });
});
