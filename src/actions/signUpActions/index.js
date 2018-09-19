import * as types from '../types';

export const signUpBegin = () => ({
  type: types.SIGN_UP_BEGIN,
});

export const signUpSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});

export const signUpFailure = () => ({
  type: types.SIGN_UP_FAILURE,
});

const handleBasicSignUp = userInfo => (dispatch) => {
  dispatch(signUpBegin());
};

export default handleBasicSignUp;
