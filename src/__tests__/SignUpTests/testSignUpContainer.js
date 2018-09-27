import React from 'react';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mount } from 'enzyme';
import { mapDispatchToProps, mapStateToProps, SignUp } from '../../components/SignUp';
import enzymeConfig from '../../testConfigurations/enzymeConfig';
import configureMockStore from '../../testConfigurations/configureMockStore';
import initialState from '../../store/initialState';

enzymeConfig();

const ConnectedSignUp = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
const store = configureMockStore(
  { signUpState: initialState.signUpInitialState });

describe('The SignUp Container', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <ConnectedSignUp
          store={store}
        />
      </MemoryRouter>);
  });

  it('should receive state and dispatch from store as props', () => {
    const signUpProps = wrapper.find(SignUp).props();
    const initialStateKeys = Object.keys(initialState.signUpInitialState);
    initialStateKeys.map(key => expect(signUpProps[key])
      .toEqual(initialState.signUpInitialState[key]),
    );
    expect(signUpProps.signUp).toBeInstanceOf(Function);
    expect(signUpProps.resetSignUpState).toBeInstanceOf(Function);
  });
});
