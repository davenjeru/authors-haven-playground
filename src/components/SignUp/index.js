import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../commons/NavBar';
import Main from '../commons/Main/index';
import Footer from '../commons/Footer';
import './SignUp.css';
import SignUpFormCard from './SignUpFormCard';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // initial state is set to the names of the input fields.
    // There are flags set to show when to run password validation for instant feedback and whether
    // or not the passwords match
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      confirmPasswordReadyForValidation: false,
      passwordsMatch: false,
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
    this.validatePassword();
    // handleSubmit here.
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
    } = this.state;

    const passwordsEmpty = password === '' || confirmPassword === '';

    if (confirmPasswordReadyForValidation) {
      if (passwordsEmpty) {
        return 'passwords-do-not-match';
      }
      return passwordsMatch ? 'passwords-match' : 'passwords-do-not-match';
    }
    return '';
  };


  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Main>
          <div className="container py-5">
            <SignUpFormCard
              onFieldChange={this.onFieldChange}
              onSubmit={this.onSubmit}
              onPasswordInputFocus={this.onPasswordInputFocus}
              onPasswordInputBlur={this.onPasswordInputBlur}
              getPasswordFieldClassName={this.getPasswordFieldClassName}
            />
          </div>
        </Main>
        <Footer />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {};

const mapStateToProps = state => (
  {
    state,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({}, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
