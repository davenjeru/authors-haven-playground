import * as actionTypes from '../actions/types';
import testReducer, { TEST_TEXT } from '../reducers/testReducer';
import initialState from '../store/initialState';

describe('The Test Reducer', () => {
  const action = type => ({ type });

  it('should return the test text if the action type is ADD_TEST_TEXT', () => {
    expect(testReducer(undefined, action(actionTypes.ADD_TEST_TEXT)).testText).toEqual(TEST_TEXT);
  });

  it('should return no test text if the action type is REMOVE_TEST_TEXT', () => {
    expect(testReducer(undefined, action(actionTypes.REMOVE_TEST_TEXT)).testText).toEqual('');
  });

  it('should return default state when it is provided an action it cannot handle', () => {
    expect(testReducer(undefined, action('UNKNOWN'))).toEqual(initialState.test);
  });
});
