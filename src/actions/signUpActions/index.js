import * as types from '../types';
import authenticationService from '../../services/backend/authenticationService';

export const signUpBegin = () => ({
  type: types.SIGN_UP_BEGIN,
});

export const signUpSuccess = message => ({
  type: types.SIGN_UP_SUCCESS,
  METADATA: { message },
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
    .then(
      (responseObject) => {
        if (responseObject.success) {
          dispatch(signUpSuccess(responseObject.message));
        } else {
          dispatch(signUpFailure(responseObject.errorMessage));
        }
      },
    );
};

export default handleBasicSignUp;
