import * as types from '../../actions/types';
import signUpReducer from '../signUpReducer';
import initialState from '../../store/initialState';

describe('The Sign Up Reducer', () => {
  const mockDispatchedAction = (type: string = '', METADATA = {}) => ({ type, METADATA });

  it('should return default state', () => {
    expect(signUpReducer(undefined, mockDispatchedAction('UNKNOWN_ACTION')))
      .toEqual(initialState.signUpInitialState);
  });

  it('should change isSubmitting to true on SIGN_UP_BEGIN', () => {
    expect(signUpReducer(undefined, mockDispatchedAction(types.SIGN_UP_BEGIN)))
      .toEqual({ ...initialState.signUpInitialState, isSubmitting: true });
  });

  it('should change signUpSuccess to true and set a successMessage on SIGN_UP_SUCCESS', () => {
    const successMessage = 'SUCCESS MESSAGE';
    expect(signUpReducer(undefined,
      mockDispatchedAction(types.SIGN_UP_SUCCESS, { successMessage })))
      .toEqual({ ...initialState.signUpInitialState, successMessage, signUpSuccess: true });
  });

  it('should change signUpSuccess to false and set a errorMessage on SIGN_UP_FAILURE', () => {
    const errorMessage = 'ERROR MESSAGE';
    expect(signUpReducer(undefined,
      mockDispatchedAction(types.SIGN_UP_FAILURE, { errorMessage })))
      .toEqual({ ...initialState.signUpInitialState, errorMessage, signUpFailure: true });
  });

  it('should reset the signUpState on SIGN_UP_RESET_STATE', () => {
    expect(signUpReducer(undefined,
      mockDispatchedAction(types.SIGN_UP_RESET_STATE)))
      .toEqual(initialState.signUpInitialState);
  });
});
