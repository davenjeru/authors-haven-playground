/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import React from 'react';
import FormInputField from '../commons/FormInputField';
import Loader from '../commons/Loader';

const SignUpFormCard = ({
  onFieldChange,
  onSubmit,
  onPasswordInputFocus,
  onPasswordInputBlur, onSignUpButtonBlur, preventSubmitOnEnter,
  getPasswordFieldClassName, shouldDisplayErrorMessage, passwordErrorMessage, isSubmitting,
}) => (
  <div
    className="card text-center mx-auto sign-up-form-card"
  >
    <div className="card-header">
      <h2>Sign Up</h2>
    </div>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
    <form
      onSubmit={onSubmit}
      onKeyPress={preventSubmitOnEnter}
    >
      <div className="row">
        <p className="col-12">You could sign up with...</p>
        <div className="col-12">
          <button type="button" className="btn btn-primary">
            <a>
              <i className="fa fa-facebook fa-2x" aria-hidden="true" />
            </a>
          </button>
          <button type="button" className="btn btn-danger ml-3">
            <a>
              <i className="fa fa-google fa-2x" aria-hidden="true" />
            </a>
          </button>
        </div>

        <hr
          style={{ width: '100%' }}
        />
        <p className="col-12">Or</p>
      </div>
      <div className="px-5">
        <div className="form-group">
          <FormInputField
            type="email"
            required
            placeholder="Email Address"
            name="email"
            onChange={onFieldChange}
          />
        </div>
        <div className="form-group">
          <FormInputField
            type="text"
            required
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={onFieldChange}
          />
        </div>
        <div className="form-group">
          <FormInputField
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={onFieldChange}
            onFocus={onPasswordInputFocus}
            onBlur={onPasswordInputBlur}
            className={getPasswordFieldClassName()}
          />
        </div>
        <div className="form-group">
          <FormInputField
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onFieldChange}
            onFocus={onPasswordInputFocus}
            onBlur={onPasswordInputBlur}
            className={getPasswordFieldClassName()}
          />
        </div>
      </div>
      {shouldDisplayErrorMessage
        ? <p className="mb-2 mx-5 p-1 alert alert-danger">{passwordErrorMessage}</p>
        : ''}
      {isSubmitting ? <Loader className="sign-up-loader" /> : ''}
      <div className="text-center">
        <button
          type="submit"
          onBlur={onSignUpButtonBlur}
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <p>
          Already have an account? Login
          <Link to="/login"> here</Link>
        </p>
      </div>
    </form>
  </div>
);


export default SignUpFormCard;
