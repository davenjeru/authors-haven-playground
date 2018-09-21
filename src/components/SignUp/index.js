import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../commons/NavBar';
import Main from '../commons/Main/index';
import Footer from '../commons/Footer/index';
import './SignUp.css';
import SignUpFormCard from './SignUpFormCard';
import handleBasicSignUp, { signUpResetState } from '../../actions/signUpActions';

/** *This is the alert that will show the user that they will be redirected after a few seconds
 * @param secondsToRedirect: {number} The seconds remaining before redirecting */
const RedirectCountdownAlert = ({ secondsToRedirect }) => (
  <div
    className="sign-up-success-message alert alert-warning text-center"
    style={{ marginTop: '5em' }}
  >
      We will redirect you to the
    {' '}
    <Link to="/login">login</Link>
    {' '}
      page in
    {' '}
    <strong>{secondsToRedirect}</strong>
    {' '}
      seconds
  </div>
);

/** *This is the class that represents the signup page and its state */
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
      shouldDisplayRedirectMessage: false,
      shouldStartRedirectCountdownBeCalled: true,
      secondsToRedirect: 20,
    };
    this.redirectTimer = () => {};
  }

  componentWillUnmount() {
    this.stopRedirectCountdown();
    const { signUpSuccess, resetSignUpState } = this.props;
    if (signUpSuccess) {
      resetSignUpState();
    }
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

  flashPasswordInputFields = () => {
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
  };

  displayPasswordErrorMessage = () => {
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
  };

  signUpTheUser = () => {
    const { signUp } = this.props;
    const { email, username, password } = this.state;
    const userInfo = { email, username, password };
    signUp(userInfo);
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.validatePassword()) {
      this.flashPasswordInputFields();
      this.displayPasswordErrorMessage();
    } else {
      this.signUpTheUser();
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

  handleRedirectCountdown = () => {
    const { secondsToRedirect } = this.state;
    console.log('redirect countdown', secondsToRedirect);
    this.setState(prevState => (
      Object.assign(
        {},
        prevState,
        {
          shouldStartRedirectCountdownBeCalled: false,
          secondsToRedirect: prevState.secondsToRedirect - 1,
        },
      )),
    );
    if (secondsToRedirect === 10) {
      console.log('redirect countdown after 10', secondsToRedirect);
      this.setState(prevState => (
        Object.assign(
          {},
          prevState,
          {
            shouldDisplayRedirectMessage: true,
          },
        )),
      );
    }
  };

  startRedirectCountdown = () => {
    const { history } = this.props;
    this.redirectTimer = setInterval(this.handleRedirectCountdown, 1000);
    setTimeout(() => {
      console.log('The timer has been stopped');
      this.stopRedirectCountdown(this.redirectTimer);
      this.redirectToLogin(history);
    }, 20000);

    return '';
  };

  stopRedirectCountdown = (redirectTimer) => {
    clearInterval(redirectTimer);
  };

  redirectToLogin = (history) => {
    history.push('/login');
  };

  render() {
    const {
      passwordError,
      secondsToRedirect,
      shouldDisplayRedirectMessage,
      shouldStartRedirectCountdownBeCalled,
    } = this.state;
    const { shouldDisplayErrorMessage, passwordErrorMessage } = passwordError;
    const {
      isSubmitting, signUpSuccess, signUpFailure, message, errorMessage,
    } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <Main>
          {isSubmitting
          && (
            <div className="blur-screen" />
          )}
          {signUpSuccess
            ? (
              <React.Fragment>
                <div
                  className="sign-up-success-message alert alert-success text-center"
                  style={{ marginTop: '10em' }}
                >
                  {message}
                </div>
                {shouldStartRedirectCountdownBeCalled ? this.startRedirectCountdown() : ''}
                {shouldDisplayRedirectMessage && (
                  <RedirectCountdownAlert
                    secondsToRedirect={secondsToRedirect}
                  />
                )}

              </React.Fragment>
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
    resetSignUpState: () => dispatch(signUpResetState()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
