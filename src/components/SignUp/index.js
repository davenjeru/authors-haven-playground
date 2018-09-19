import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../commons/NavBar';
import Main from '../commons/Main/index';
import Footer from '../commons/Footer/index';
import './SignUp.css';
import SignUpFormCard from './SignUpFormCard';
import handleBasicSignUp from '../../actions/signUpActions';
import Loader from '../commons/Loader';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // initial state is set to the names of the input fields.
    // There are flags set to show when to run password validation for instant feedback and whether
    // or not the passwords match
    // There is a an object that handles the display of password errors:
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      confirmPasswordReadyForValidation: false,
      passwordsMatch: false,
      passwordError: {
        shouldDisplayErrorMessage: false,
        passwordErrorMessage: 'Passwords do not match!',
        shouldChangeClassName: false,
      },
    };
  }

  /** * Function for validating that password and confirm password match
   * @return {boolean} whether the passwords match or not */
  validatePassword = () => {
    const {
      password,
      confirmPassword,
    } = this.state;
    const passwordsMatch = password === confirmPassword;
    this.setState(
      prevState => (Object.assign({},
        prevState,
        {
          passwordsMatch,
        },
      )),
    );
    return passwordsMatch;
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.validatePassword()) {
      this.setState(
        prevState => (Object.assign({},
          prevState,
          {
            passwordError: {
              ...prevState.passwordError,
              shouldDisplayErrorMessage: true,
            },
          },
        )),
      );

      const timerId = setInterval(() => {
        this.setState(
          prevState => (Object.assign({},
            prevState,
            {
              passwordError: {
                ...prevState.passwordError,
                shouldChangeClassName: !prevState.passwordError.shouldChangeClassName,
              },
            },
          )),
        );
      }, 150);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1000);

      this.setState(
        prevState => (Object.assign({},
          prevState,
          {
            passwordError: {
              ...prevState.passwordError,
              shouldDisplayErrorMessage: true,
            },
          },
        )),
      );
    } else {
      const { signUp } = this.props;
      const { email, username, password } = this.state;
      const userInfo = { email, username, password };
      signUp(userInfo);
    }
  };

  onFieldChange = (event) => {
    const { confirmPasswordReadyForValidation } = this.state;
    this.setState(
      { [event.target.name]: event.target.value }, () => {
        if (confirmPasswordReadyForValidation) {
          this.validatePassword();
        }
      },
    );
  };

  onPasswordInputFocus = () => {
    this.validatePassword();
    this.setState(
      prevState => (Object.assign({}, prevState, {
        confirmPasswordReadyForValidation: true,
      }))
      ,
    );
  };

  onPasswordInputBlur = () => {
    this.setState(
      prevState => (Object.assign({}, prevState, {
        confirmPasswordReadyForValidation: false,
      }))
      ,
    );
  };

  getPasswordFieldClassName = () => {
    const {
      confirmPasswordReadyForValidation,
      passwordsMatch,
      password,
      confirmPassword,
      passwordError,
    } = this.state;

    const passwordsEmpty = password === '' || confirmPassword === '';

    if (passwordError.shouldChangeClassName) {
      return 'passwords-do-not-match';
    }

    if (confirmPasswordReadyForValidation) {
      if (passwordsEmpty) {
        return 'passwords-do-not-match';
      }
      return passwordsMatch ? 'passwords-match' : 'passwords-do-not-match';
    }
    return '';
  };

  onSignUpButtonBlur = () => {
    this.setState(
      prevState => (Object.assign({},
        prevState,
        {
          passwordError: {
            ...prevState.passwordError,
            shouldDisplayErrorMessage: false,
          },
        },
      )),
    );
  };

  preventSubmitOnEnter = (event) => {
    const { passwordsMatch } = this.state;
    if (event.key === 'Enter' && !passwordsMatch) {
      event.preventDefault();
    }
  };


  render() {
    const { passwordError } = this.state;
    const { shouldDisplayErrorMessage, passwordErrorMessage } = passwordError;
    const { isSubmitting, signUpSuccess, signUpFailure, message, errorMessage } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <Main>
          {isSubmitting
            && (
              <div className="blur-screen">
                <Loader className="sign-up-loader" />
              </div>
            )}
          {signUpSuccess
            ? (
              <div
                className="alert alert-success text-center"
                style={{ margin: '10em 5em auto 5em' }}
              >
                {message}
              </div>
            ) : (
              <div className="container py-5">
                {signUpFailure && (
                  <div className="sign-up-form-card mx-auto">
                    <div className="alert alert-danger text-center">
                      {errorMessage}
                    </div>
                  </div>

                )}
                <SignUpFormCard
                  onFieldChange={this.onFieldChange}
                  onSubmit={this.onSubmit}
                  onPasswordInputFocus={this.onPasswordInputFocus}
                  onPasswordInputBlur={this.onPasswordInputBlur}
                  getPasswordFieldClassName={this.getPasswordFieldClassName}
                  shouldDisplayErrorMessage={shouldDisplayErrorMessage}
                  passwordErrorMessage={passwordErrorMessage}
                  onSignUpButtonBlur={this.onSignUpButtonBlur}
                  isSubmitting={isSubmitting}
                  preventSubmitOnEnter={this.preventSubmitOnEnter}
                />
              </div>
            )}
        </Main>
        <Footer />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {};

const mapStateToProps = ({ signUpState }) => (
  {
    ...signUpState,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signUp: userInfo => dispatch(handleBasicSignUp(userInfo)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
