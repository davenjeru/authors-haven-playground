import * as types from '../actions/types';

export const signUpInitialState = {
  isSubmitting: false,
  signUpSuccess: false,
  signUpFailure: false,
};

const signUpReducer = (state = signUpInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case types.SIGN_UP_BEGIN:
      return Object.assign({}, signUpInitialState, {
        isSubmitting: true,
      });
    case types.SIGN_UP_SUCCESS:
      return Object.assign({}, signUpInitialState, {
        signUpSuccess: true,
      });
    case types.SIGN_UP_FAILURE:
      return Object.assign({}, signUpInitialState, {
        signUpFailure: true,
      });
  }
};

export default signUpReducer;
