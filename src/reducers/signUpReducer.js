import * as types from '../actions/types';
import initialState from '../store/initialState';

const signUpReducer = (state = initialState.signUpInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case types.SIGN_UP_BEGIN:
      return Object.assign({}, initialState.signUpInitialState, {
        isSubmitting: true,
      });
    case types.SIGN_UP_SUCCESS:
      return Object.assign({}, initialState.signUpInitialState, {
        signUpSuccess: true,
        message: action.METADATA.message,
      });
    case types.SIGN_UP_FAILURE:
      return Object.assign({}, initialState.signUpInitialState, {
        signUpFailure: true,
        errorMessage: action.METADATA.errorMessage,
      });
    case types.SIGN_UP_RESET_STATE:
      return Object.assign({}, initialState.signUpInitialState);
  }
};

export default signUpReducer;
