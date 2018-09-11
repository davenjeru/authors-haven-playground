import * as actionTypes from './types';

export const addTestText = () => (
  {
    type: actionTypes.ADD_TEST_TEXT,
  }
);

export const removeTestText = () => (
  {
    type: actionTypes.REMOVE_TEST_TEXT,
  }
);
