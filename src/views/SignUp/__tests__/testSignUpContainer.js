import React from 'react';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ReduxConnectedSignUp, { SignUp } from '..';
import enzymeConfig from '../../../testConfigurations/enzymeConfig';
import initialState from '../../../store/initialState';
import configureMockStore from '../../../testConfigurations/configureMockStore';
import * as actionTypes from '../../../actions/types';
import { mockResponse } from '../../../services/backend/__tests__/signUpAuthenticationServiceTests';
import { signUpUrl } from '../../../services/backend/authenticationService';
import { mockSuccessResponseObject } from '../../../services/backend/mockData';
import { REDIRECT_COUNTDOWN_DURATION } from '../../../constants';
import NotFound from '../../NotFound';

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
    wrapper.unmount();
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
    expect(wrapper.find('p.alert.alert-danger')).toHaveLength(1);
    expect(mockAxios.post).not.toHaveBeenCalled();
    done();
  });

  it('should submit the form when the passwords match', async (done) => {
    // adding a similar password and simulating submit
    await confirmPasswordInput.simulate('change',
      {
        target:
          {
            name: 'confirmPassword',
            value: TEST_VALUE,
          },
      });
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
  });
});
