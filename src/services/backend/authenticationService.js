import axios from 'axios';
import { BACKEND_ROOT_URL } from '../../constants';

export const signUpUrl = `${BACKEND_ROOT_URL}/users/signup/`;

/** Class that represents API calls related to a authentication */
class authenticationService {
  static signUpAttributes: Object = {
    defaultErrorMessage: 'We could not sign you up at the moment. '
      + 'If the problem persists, please refresh the page',
  };

  /** * This is the API call for signing up a user
   * @returns a Promise
   * @return {Promise} resolves with a successMessage or rejects with an errorMessage */
  static signUp(userInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post(signUpUrl, userInfo)
        .then((response) => {
          resolve(response.data.Message);
        })
        .catch((error) => {
          const extractFirstError = (res) => {
            try {
              const [firstKey] = Object.keys(res.data.errors);
              const [firstError] = res.data.errors[firstKey];
              return firstError;
            } catch (e) {
              return authenticationService.signUpAttributes.defaultErrorMessage;
            }
          };
          reject(extractFirstError(error.response));
        });
    });
  }
}

export default authenticationService;
