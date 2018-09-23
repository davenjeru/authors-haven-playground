import mockAxios from 'jest-mock-axios';
import configureMockStore from '../../testConfigurations/configureMockStore';
import handleBasicSignUp, { signUpResetState } from '../../actions/signUpActions/index';
import { userInfo, mockResponse, mockError } from './signUpAuthenticationServiceTests';
import * as types from '../../actions/types';
import authenticationService from '../../services/backend/authenticationService';

const mockStore = configureMockStore({});

afterEach(() => {
  mockStore.clearActions();
});

describe('The handleBasicSignUp action', () => {
  beforeEach(() => {
    mockStore.dispatch(handleBasicSignUp(userInfo));
  });

  it('should dispatch SIGN_UP_BEGIN as the firstAction when called', () => {
    const [firstAction] = mockStore.getActions();
    expect(firstAction.type).toEqual(types.SIGN_UP_BEGIN);
  });

  it('should dispatch SIGN_UP_SUCCESS as the secondAction with a successMessage if it succeeds',
    () => {
      const successMessage = 'Check your email for further instructions';
      const responseObj = { data: { Message: successMessage } };
      const lastReqInfo = mockAxios.lastReqGet();

      mockResponse(responseObj, lastReqInfo).then(() => {
        const [firstAction, secondAction] = mockStore.getActions();
        expect(firstAction.type).toEqual(types.SIGN_UP_BEGIN);
        expect(secondAction.type).toEqual(types.SIGN_UP_SUCCESS);
        expect(secondAction.METADATA).toEqual({ successMessage });
      });
    });

  it('should dispatch SIGN_UP_FAILURE as the secondAction with an errorsMessage if it errors',
    () => {
      const lastReqInfo = mockAxios.lastReqGet();

      mockError({}, lastReqInfo).then(() => {
        const [firstAction, secondAction] = mockStore.getActions();
        expect(firstAction.type).toEqual(types.SIGN_UP_BEGIN);
        expect(secondAction.type).toEqual(types.SIGN_UP_FAILURE);
        // here we are testing whether the default error message is given
        expect(secondAction.METADATA).toEqual(
          {
            errorMessage: authenticationService.signUpAttributes.defaultErrorMessage,
          });
      });
    });
});


describe('The signUpResetState action', () => {
  it('should dispatch SIGN_UP_RESET_STATE', () => {
    mockStore.dispatch(signUpResetState());
    const [firstAction] = mockStore.getActions();
    expect(firstAction.type).toEqual(types.SIGN_UP_RESET_STATE);
  });
});
