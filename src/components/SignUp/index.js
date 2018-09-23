import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../commons/NavBar';
import Main from '../commons/Main/index';
import handleBasicSignUp, { signUpResetState } from '../../actions/signUpActions';
import RedirectCountdownAlert from './RedirectCountdownAlert';
import SignUpFormCard from './SignUpFormCard';
import Footer from '../commons/Footer/index';
import './SignUp.css';

/** *This is the class that represents the signup page and its state */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    /*
    * initial state is set to the names of the input fields: email,
    * username, password and confirmPassword */

    /*
    * The confirmPasswordReadyForValidation flag is set to show when to run password
    * validation for instant feedback on the input fields. It is set to true when either the
    * password or the confirmPassword field is in focus
    */

    // The passwordsMatch flag is set to show whether or not the passwords match

    /*
    * There is a an object that handles the display of password errors(passwordErrors) with an
    * errorMessage and a flag shouldDisplayErrorMessage that is set to true when the user tries to
    * sign up with passwords that do not match
    * shouldChangeClassName is alternated between true and false to give a flashing effect when
    * the user tries to sign up with passwords that do not match
    */

    /*
    * The shouldDisplayRedirectMessage is set to show whether or not the RedirectCountdownAlert
    * should be displayed to the user
    */

    /*
    * shouldStartRedirectCountdownBeCalled is set to true at first so that its called once in the
    * render function then never again since it modifies state
    */

    // secondsToRedirect the amount of time in seconds to wait before redirecting a user
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

    /* the redirectTimer is set to an empty function at first. This is done to make it available to
    * the stopRedirectCountdown function in this class */
    this.redirectTimer = () => {};
  }

  /** * Stop the countdown and reset the state in the store just before the component unmounts */
  componentWillUnmount() {
    this.stopRedirectCountdown();
    const { signUpSuccess, resetSignUpState } = this.props;
    if (signUpSuccess) {
      resetSignUpState();
    }
  }

  /** * Handles signing up the user by dispatching an action that
   * sends the request to the backend */
  signUpTheUser = () => {
    const { signUp } = this.props;
    const { email, username, password } = this.state;
    const userInfo = { email, username, password };
    signUp(userInfo);
  };

  /** * This is what is done when the form is submitted
   * @param event {Event} The DOM event that triggered this function */
  onSubmit = (event) => {
    event.preventDefault();
    if (!this.validatePassword()) {
      this.displayPasswordErrorMessage();
      this.flashPasswordInputFields();
    } else {
      this.signUpTheUser();
    }
  };

  /** * Update the internal state when an input field changes
   * @param event {Event} The DOM event that triggered this function */
  onFieldChange = (event) => {
    const { confirmPasswordReadyForValidation } = this.state;
    /*
    * Get the name of the field that triggered the event and set it's corresponding
    * value in state
    * Immediately the state is changed, run validatePassword if confirmPasswordReadyForValidation
    */
    const { name, value } = event.target;
    this.setState(
      prevState => (
        Object.assign({}, prevState, { [name]: value })
      ),
      () => {
        if (confirmPasswordReadyForValidation) {
          this.validatePassword();
        }
      },
    );
  };

  /**
   * set confirmPasswordReadyForValidation to true when either the password or confirmPassword is
   * in focus after running validatePassword
   */
  onPasswordInputFocus = () => {
    this.validatePassword();
    this.setState(
      prevState => (Object.assign({}, prevState, {
        confirmPasswordReadyForValidation: true,
      }))
      ,
    );
  };

  /**
   * set confirmPasswordReadyForValidation to true when either the password or confirmPassword
   * is blurred
   */
  onPasswordInputBlur = () => {
    this.setState(
      prevState => (Object.assign({}, prevState, {
        confirmPasswordReadyForValidation: false,
      }))
      ,
    );
  };

  /**
   * This function is called when the password fields need a className.
   * @return {string} a class defined in SignUp.css
   */
  getPasswordFieldClassName = () => {
    const {
      confirmPasswordReadyForValidation,
      passwordsMatch,
      password,
      confirmPassword,
      passwordError,
    } = this.state;

    const passwordsEmpty = password === '' || confirmPassword === '';

    // If the password error flag shouldChangeClassName is set to true, the fields should glow red
    if (passwordError.shouldChangeClassName) {
      return 'passwords-do-not-match';
    }

    // If the one of the password fields is in focus, return a class name.
    if (confirmPasswordReadyForValidation) {
      // If the passwords are empty then the fields should glow red
      if (passwordsEmpty) {
        return 'passwords-do-not-match';
      }
      // the fields should glow green if the passwords match else they glow red
      return passwordsMatch ? 'passwords-match' : 'passwords-do-not-match';
    }
    // return an empty string if one none of these are met
    return '';
  };

  /** * Handles the flashing of the password input fields */
  flashPasswordInputFields = () => {
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

  /**
   * Function for validating that password and confirm password match
   * It updates the passwordsMatch flag in the state accordingly
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

  /** * Handles the display of the 'Passwords do not match!' error message */
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

  /**
   * When the user clicks outside the sign up button, then don't display the passwordErrorMessage
   */
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

  /**
   * This function prevents onSubmit when the enter key is pressed and the passwords do not match
   * @param event {Event} the DOM event that triggered this function
   */
  preventSubmitOnEnter = (event) => {
    const { passwordsMatch } = this.state;
    if (event.key === 'Enter' && !passwordsMatch) {
      event.preventDefault();
    }
  };

  /**
   * This is what should be done during the interval.
   */
  handleRedirectCountdown = () => {
    const { secondsToRedirect } = this.state;
    /* set shouldStartRedirectCountdownBeCalled to false so that it is not called when the
     * component updates
     * Subtract 1 from secondsToRedirect
    */
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

    // if the seconds get to 10, show the redirect message
    if (secondsToRedirect === 10) {
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

  /**
   * Starts the redirect countdown. Sets a timeout that stops the countdown and redirects to the
   * login page
   */
  startRedirectCountdown = () => {
    const { history } = this.props;
    this.redirectTimer = setInterval(this.handleRedirectCountdown, 1000);
    setTimeout(() => {
      this.stopRedirectCountdown(this.redirectTimer);
      this.redirectToLogin(history);
    }, 20000);
  };

  /**
   * Stops the interval that was used to do the countdown
   * @param redirectTimer {setInterval} the interval that was used to do the countdown
   */
  stopRedirectCountdown = (redirectTimer) => {
    clearInterval(redirectTimer);
  };

  /**
   * Redirects to the login page
   * @param history {Object} the history object given by <BrowserRouter/>
   */
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
      isSubmitting, signUpSuccess, signUpFailure, successMessage, errorMessage,
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
                  {successMessage}
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

SignUp.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  signUpSuccess: PropTypes.bool.isRequired,
  signUpFailure: PropTypes.bool.isRequired,
  resetSignUpState: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape(
    {
      push: PropTypes.func.isRequired,
    },
  ).isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

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
