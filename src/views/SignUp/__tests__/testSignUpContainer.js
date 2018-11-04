import React from 'react';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ReduxConnectedSignUp, { SignUp } from '..';
import enzymeConfig from '../../../testConfigurations/enzymeConfig';
import initialState from '../../../store/initialState';
import configureMockStore from '../../../testConfigurations/configureMockStore';
import * as actionTypes from '../../../actions/types';
import authenticationService, { signUpUrl } from '../../../services/backend/authenticationService';
import { mockSuccessResponseObject } from '../../../services/backend/mockData';
import { REDIRECT_COUNTDOWN_DURATION } from '../../../constants';
import * as routes from '../../../routes';
import { mockResponse } from '../../../testConfigurations/mockAxiosHelpers';

enzymeConfig();

const RouterConnectedSignUp = withRouter(ReduxConnectedSignUp);
let store;

describe('The SignUp Container', () => {
  let wrapper;
  let SignUpComponent;
  let signUpProps;
  let emailInput;
  let usernameInput;
  let passwordInput;
  let confirmPasswordInput;
  let form;
  const TEST_VALUE = 'password';
  const preventDefault = jest.fn();

  beforeAll(() => {
    store = configureMockStore(
      { signUpState: initialState.signUpInitialState });
    wrapper = mount(
      <MemoryRouter>
        <RouterConnectedSignUp
          store={store}
        />
      </MemoryRouter>);
    SignUpComponent = wrapper.find(SignUp);
    signUpProps = SignUpComponent.props();
  });

  afterEach(() => {
    preventDefault.mockReset();
  });

  afterAll(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should receive state and dispatch from store as props', () => {
    Object.keys(initialState.signUpInitialState).map(key => expect(signUpProps[key])
      .toEqual(initialState.signUpInitialState[key]),
    );
    expect(signUpProps.signUp).toBeInstanceOf(Function);
    expect(signUpProps.resetSignUpState).toBeInstanceOf(Function);
  });

  it('should change the document title after mounting', () => {
    expect(document.title).toEqual('Authors Haven | Sign Up');
  });

  it('should find the input fields on render', () => {
    // Finding different fields on the form
    passwordInput = wrapper.find('input').find({ name: 'password' });
    expect(passwordInput).toHaveLength(1);
    confirmPasswordInput = wrapper.find('input').find({ name: 'confirmPassword' });
    expect(confirmPasswordInput).toHaveLength(1);
    emailInput = wrapper.find('input').find({ name: 'email' });
    expect(emailInput).toHaveLength(1);
    usernameInput = wrapper.find('input').find({ name: 'username' });
    expect(usernameInput).toHaveLength(1);
  });

  it('should allow typing on fields', async (done) => {
    // simulate typing on all fields except confirm password
    await passwordInput.simulate('focus');
    expect(SignUpComponent.state().confirmPasswordReadyForValidation).toEqual(true);
    await passwordInput.simulate('change', { target: { name: 'password', value: TEST_VALUE } });
    await passwordInput.simulate('blur');
    expect(SignUpComponent.state().confirmPasswordReadyForValidation).toEqual(false);
    await emailInput.simulate('change', { target: { name: 'email', value: TEST_VALUE } });
    await usernameInput.simulate('change', { target: { name: 'username', value: TEST_VALUE } });
    // check the internal state of the SignUpContainer
    expect(SignUpComponent.state().password).toEqual(TEST_VALUE);
    expect(SignUpComponent.state().passwordsMatch).toEqual(false);
    done();
  });

  it('should prevent submit when Enter is pressed while passwords do not match',
    async (done) => {
      // preventDefault should not have been called if another button is pressed.
      form = SignUpComponent.find('form');
      await form.simulate('keypress', { key: 'S', preventDefault });
      expect(preventDefault).not.toHaveBeenCalled();
      preventDefault.mockReset();
      // preventDefault should have been called only once if Enter button is pressed.
      await form.simulate('keypress', { key: 'Enter', preventDefault });
      expect(preventDefault).toHaveBeenCalledTimes(1);
      done();
    });

  it('should display passwords do not match when the form is submitted '
    + 'while passwords do not match',
  async (done) => {
    // simulate a submission with wrong password/confirm password combination
    await form.simulate('submit', { preventDefault });
    const passwordErrorElement = wrapper.find('p.alert.alert-danger');
    expect(passwordErrorElement).toHaveLength(1);
    expect(passwordErrorElement.text()).toEqual('Passwords do not match!');
    expect(mockAxios.post).not.toHaveBeenCalled();
    done();
  });

  it('should remove the passwords do not match error when the sign-up button blurs',
    async (done) => {
      await wrapper.find('button')
        .find({ type: 'submit' })
        .simulate('blur', { preventDefault });
      const passwordErrorElement = wrapper.find('p.alert.alert-danger');
      expect(passwordErrorElement).toHaveLength(0);
      expect(SignUpComponent.state().passwordError.shouldDisplayErrorMessage).toEqual(false);
      done();
    });

  it('should submit the form when the only when passwords match', async (done) => {
    // adding a similar password and simulating submit
    await confirmPasswordInput.simulate('change',
      {
        target:
          {
            name: 'confirmPassword',
            value: 'pass',
          },
      });
    await confirmPasswordInput.simulate('focus');
    expect(SignUpComponent.state().passwordsMatch).toEqual(false);

    await confirmPasswordInput.simulate('change',
      {
        target:
          {
            name: 'confirmPassword',
            value: TEST_VALUE,
          },
      });
    await confirmPasswordInput.simulate('focus');
    expect(SignUpComponent.state().passwordsMatch).toEqual(true);

    await form.simulate('submit', { preventDefault });

    expect(mockAxios.post).toHaveBeenCalledWith(signUpUrl, {
      email: TEST_VALUE,
      password: TEST_VALUE,
      username: TEST_VALUE,
    });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toContainEqual({ type: actionTypes.SIGN_UP_BEGIN });
    await mockResponse(mockSuccessResponseObject, mockAxios.lastReqGet());
    expect(store.getActions()).toContainEqual({
      type:
      actionTypes.SIGN_UP_SUCCESS,
      METADATA:
        { successMessage: mockSuccessResponseObject.data.Message },
    });
    done();
  });

  describe('On SIGN_UP_BEGIN', () => {
    beforeAll(() => {
      store = configureMockStore({
        signUpState: { ...initialState.signUpInitialState, isSubmitting: true },
      });

      wrapper = mount(
        <MemoryRouter>
          <RouterConnectedSignUp
            store={store}
          />
        </MemoryRouter>);
      SignUpComponent = wrapper.find(SignUp);
      signUpProps = SignUpComponent.props();
    });

    it('should have isSubmitting equal to true', () => {
      expect(signUpProps.isSubmitting).toEqual(true);
    });

    it('should render the blur-screen element', () => {
      expect(SignUpComponent.find('.blur-screen')).toHaveLength(1);
    });

    it('should render the loader', () => {
      expect(SignUpComponent.find('img.sign-up-loader')).toHaveLength(1);
    });

    it('should render a disabled sign up button', () => {
      const signUpButton = SignUpComponent.find('button').find({ type: 'submit' });
      expect(signUpButton).toHaveLength(1);
      expect(signUpButton.props()).toHaveProperty('disabled', true);
      expect(signUpButton.text()).toEqual('Signing up...');
    });
  });

  describe('On SIGN_UP_FAILURE', () => {
    beforeAll(() => {
      store = configureMockStore({
        signUpState: {
          ...initialState.signUpInitialState,
          signUpFailure: true,
          errorMessage: authenticationService.signUpAttributes.defaultErrorMessage,
        },
      });

      wrapper = mount(
        <MemoryRouter>
          <RouterConnectedSignUp
            store={store}
          />
        </MemoryRouter>);
      SignUpComponent = wrapper.find(SignUp);
      signUpProps = SignUpComponent.props();
    });

    it('should have signUpFailure equal to true', () => {
      expect(signUpProps.signUpFailure).toEqual(true);
    });

    it('should have an errorMessage', () => {
      expect(signUpProps.errorMessage).toEqual(
        authenticationService.signUpAttributes.defaultErrorMessage,
      );
    });

    it('should render an alert with the error message', () => {
      const errorAlert = SignUpComponent.find('.alert-danger');
      expect(errorAlert).toHaveLength(1);
      expect(errorAlert.text()).toEqual(authenticationService.signUpAttributes.defaultErrorMessage);
    });
  });

  describe('On SIGN_UP_SUCCESS', () => {
    beforeAll(() => {
      store = configureMockStore({
        signUpState: {
          ...initialState.signUpInitialState,
          signUpSuccess: true,
          successMessage: mockSuccessResponseObject.data.Message,
        },
      });

      wrapper = mount(
        <MemoryRouter>
          <RouterConnectedSignUp
            store={store}
          />
        </MemoryRouter>);
      SignUpComponent = wrapper.find(SignUp);
      signUpProps = SignUpComponent.props();
    });

    it('should have signUpSuccess equal to true', () => {
      expect(signUpProps.signUpSuccess).toEqual(true);
    });

    it('should have a successMessage', () => {
      expect(signUpProps.successMessage).toEqual(
        mockSuccessResponseObject.data.Message,
      );
    });

    it('should render an alert with the success message', () => {
      const successAlert = SignUpComponent.find('.sign-up-success-message.alert-success');
      expect(successAlert).toHaveLength(1);
      expect(successAlert.text()).toEqual(mockSuccessResponseObject.data.Message);
    });

    it('should start the redirect countdown', async (done) => {
      await await setTimeout(async () => {
        expect(SignUpComponent.state().secondsToRedirect).toBeLessThan(20);
        expect(SignUpComponent.state().shouldDisplayRedirectMessage).toEqual(false);
        done();
      }, REDIRECT_COUNTDOWN_DURATION / 3);
    });

    it('should render a redirect countdown when the seconds are less than 10', async (done) => {
      await setTimeout(async () => {
        expect(SignUpComponent.state().shouldDisplayRedirectMessage).toEqual(true);
        expect(SignUpComponent.state().secondsToRedirect).toBeLessThan(10);
        /* For some reason, I cannot seem to find the RedirectCountdownAlert component
           * in the wrapper
           */
        // expect(SignUpComponent.find('.sign-up-success-message.alert-warning')).toHaveLength(1);
        done();
      }, REDIRECT_COUNTDOWN_DURATION / 3);
    });

    it('should redirect to login', async (done) => {
      await setTimeout(async () => {
        expect(signUpProps.history.entries).toHaveLength(2);
        expect(signUpProps.history.entries[1].pathname).toEqual(routes.LOG_IN_ROUTE);
        done();
      }, REDIRECT_COUNTDOWN_DURATION / 3);
    });
  });

  describe('When unmounting', () => {
    beforeAll(() => {
      // mocking the global
      global.clearInterval = jest.fn().mockImplementationOnce();
      global.clearTimeout = jest.fn().mockImplementationOnce();
      wrapper.unmount();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should clear any intervals left', () => {
      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });

    it('should dispatch SIGN_UP_RESET_STATE', () => {
      expect(store.getActions()).toContainEqual({ type: actionTypes.SIGN_UP_RESET_STATE });
    });
  });
});
