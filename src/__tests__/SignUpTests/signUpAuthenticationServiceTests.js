import mockAxios from 'jest-mock-axios';
import authenticationService, { signUpUrl } from '../../services/backend/authenticationService';

describe('The authenticationService.signUp', () => {
  // initialize the variables that will be used to create our spies
  let thenFn;
  let catchFn;

  /* mockResponse and mockError are asynchronous functions that need to be wrapped
   * around async await
   */
  const mockResponse = async (responseObject = undefined, requestInfo = undefined) => {
    await mockAxios.mockResponse(responseObject, requestInfo);
  };

  const mockError = async (err = undefined, requestInfo = undefined) => {
    /* this is to simulate how axios obtains its errors.
     * It expects an object that has a response attribute that holds the response data
     * from the backend
     */
    const errorObject = { response: err };
    await mockAxios.mockError(errorObject, requestInfo);
  };

  // initialize the user information that should be sent in the request body
  const userInfo = {
    email: 'test@email.com',
    username: 'testUsername',
    password: 'testPassword',
  };

  // call the authenticationService.signUp(userInfo) before each single test
  beforeEach(
    () => {
      /* set up spies for the functions that will be called on .then and .catch of our
       * authenticationService.signUp
       * They were declared in the upper scope so that when every single test runs,
       * they become new spies
       */
      thenFn = jest.fn();
      catchFn = jest.fn();

      authenticationService.signUp(userInfo)
        .then(thenFn)
        .catch(catchFn);
    },
  );

  // cleaning up the mess left behind the previous test
  afterEach(() => {
    mockAxios.reset();
  });

  it('should call axios.post with signUpUrl and data in the body', () => {
    expect(mockAxios.post).toHaveBeenCalledWith(signUpUrl, userInfo);
  });

  it('should receive a success response and extract the message from it', () => {
    // model the responseObj according to our backend specification
    // notice the capital M in Message
    const successMessage = 'Check your email for further instructions';
    const responseObj = { data: { Message: successMessage } };
    const lastReqInfo = mockAxios.lastReqGet();

    mockResponse(responseObj, lastReqInfo).then(() => {
      expect(thenFn).toHaveBeenCalledWith(successMessage);
      expect(catchFn).not.toHaveBeenCalled();
    });
  });

  it('should extract the first error from error messages sent by the backend', () => {
    // the backend models the errors into an object whose attributes are arrays
    // the front end should extract the first error
    const emailError = ['Email already exists, please login or use a different email'];
    const usernameError = ['Username already exists, please enter a different username'];
    const err = {
      data: {
        errors: {
          email: emailError,
          username: usernameError,
        },
      },
    };
    const lastReqInfo = mockAxios.lastReqGet();
    mockError(err, lastReqInfo).then(() => {
      expect(catchFn).toHaveBeenCalledWith(emailError[0]);
      expect(thenFn).not.toHaveBeenCalled();
    });
  });

  it('should return its own error message if the request data did not provide it', () => {
    // here we call mockError with an empty object to simulate an error not provided by our backend
    const lastReqInfo = mockAxios.lastReqGet();
    mockError({}, lastReqInfo).then(() => {
      expect(catchFn).toHaveBeenCalledWith(
        authenticationService.signUpAttributes.defaultErrorMessage,
      );
      expect(thenFn).not.toHaveBeenCalled();
    });
  });
});
