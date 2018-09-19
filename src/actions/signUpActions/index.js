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

const handleBasicSignUp = userInfo => (dispatch) => {
  dispatch(signUpBegin());
  authenticationService.signUp(userInfo)
    .then(
      (responseObject) => {
        if (responseObject.success) {
          setTimeout(() => dispatch(signUpSuccess(responseObject.message)), 1000);
        } else {
          setTimeout(() => dispatch(signUpFailure(responseObject.errorMessage)), 1000);
        }
      },
    );
};

export default handleBasicSignUp;
