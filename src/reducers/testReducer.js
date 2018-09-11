import * as actionTypes from '../actions/types';
import initialState from '../store/initialState';

export const TEST_TEXT = 'THIS TEXT HAS BEEN ADDED TO SHOW THAT CONNECTION TO REDUX WAS SUCCESSFUL';

const testReducer = (state = initialState.test, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEST_TEXT:
      return Object.assign({}, state, {
        testText: TEST_TEXT,
      });
    case actionTypes.REMOVE_TEST_TEXT:
      return Object.assign({}, state, {
        testText: '',
      });
    default:
      return state;
  }
};

export default testReducer;
