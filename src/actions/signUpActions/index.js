import * as types from '../types';
import authenticationService from '../../services/backend/authenticationService';

export const signUpBegin = () => ({
  type: types.SIGN_UP_BEGIN,
});

export const signUpSuccess = successMessage => ({
  type: types.SIGN_UP_SUCCESS,
  METADATA: { successMessage },
});

export const signUpFailure = errorMessage => ({
  type: types.SIGN_UP_FAILURE,
  METADATA: { errorMessage },
});

export const signUpResetState = () => ({
  type: types.SIGN_UP_RESET_STATE,
});

const handleBasicSignUp = userInfo => (dispatch) => {
  dispatch(signUpBegin());
  authenticationService.signUp(userInfo)
    // when the promise resolves... dispatch signupSuccess with the successMessage
    .then(successMessage => dispatch(signUpSuccess(successMessage)))
    // when the promise rejects, dispatch signUpFailure with the errorMessage
    .catch(errorMessage => dispatch(signUpFailure(errorMessage)));
};

export default handleBasicSignUp;
