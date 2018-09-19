import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;
const signUpUrl = `${REACT_APP_BASE_URL}/users/signup/`;

/** Class that represents API calls related to a authentication */
class authenticationService {
  /** * This is the API call for getting a user's articles
   * @returns an Object with the success status and article list or error message
   * @return {Object} success: bool, errorMessage: string, articles: Array */
  static signUp(userInfo) {
    return axios
      .post(signUpUrl, userInfo)
      .then(response => ({
        success: true,
        message: response.data.Message,
      }))
      .catch((error) => {
        const extractFirstError = (res) => {
          if (res.data.errors) {
            const [firstKey] = Object.keys(res.data.errors);
            const [firstError] = res.data.errors[firstKey];
            return firstError;
          }
          return 'We could not get your articles at the moment. '
            + 'If the problem persists, please refresh the page or login again';
        };

        return ({
          success: false,
          errorMessage: extractFirstError(error.response),
        });
      });
  }
}

export default authenticationService;
