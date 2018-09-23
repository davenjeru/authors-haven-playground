import renderer from 'react-test-renderer';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SignUpFormCard from '../../components/SignUp/SignUpFormCard';

const propFunctionsMock = jest.fn();

const signUpFormCardPropsInitial = {
  onFieldChange: propFunctionsMock,
  onPasswordInputBlur: propFunctionsMock,
  getPasswordFieldClassName: propFunctionsMock,
  onPasswordInputFocus: propFunctionsMock,
  onSubmit: propFunctionsMock,
  onSignUpButtonBlur: propFunctionsMock,
  preventSubmitOnEnter: propFunctionsMock,
  isSubmitting: false,
  shouldDisplayErrorMessage: false,
  passwordErrorMessage: 'Passwords do not match',
};

describe('The SignUpFormCard', () => {
  it('should not regress - what is first seen', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <SignUpFormCard {...signUpFormCardPropsInitial} />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should not regress - what is seen on submit with passwords that do not match', () => {
    const signUpFormCardPropsOnSubmitError = {
      ...signUpFormCardPropsInitial,
      shouldDisplayErrorMessage: true,
    };
    const tree = renderer.create(
      <MemoryRouter>
        <SignUpFormCard {...signUpFormCardPropsOnSubmitError} />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should not regress - what is seen when submitting', () => {
    const signUpFormCardPropsWhileSubmitting = {
      ...signUpFormCardPropsInitial,
      isSubmitting: true,
    };
    const tree = renderer.create(
      <MemoryRouter>
        <SignUpFormCard {...signUpFormCardPropsWhileSubmitting} />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
