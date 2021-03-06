import mockAxios from 'jest-mock-axios';
import authenticationService, { signUpUrl } from '../authenticationService';
import { mockErrorResponseObject, mockSuccessResponseObject, mockUserInfo } from '../mockData';
import { mockError, mockResponse } from '../../../testConfigurations/mockAxiosHelpers';

// initialize the variables that will be used to create our spies
let thenFn;
let catchFn;

describe('The authenticationService.signUp', () => {
  // call the authenticationService.signUp(mockUserInfo) before each single test
  beforeEach(
    () => {
      /* set up spies for the functions that will be called on .then and .catch of our
       * authenticationService.signUp
       * They were declared in the upper scope so that when every single test runs,
       * they become new spies
       */
      thenFn = jest.fn();
      catchFn = jest.fn();

      authenticationService.signUp(mockUserInfo)
        .then(thenFn)
        .catch(catchFn);
    },
  );

  // cleaning up the mess left behind the previous test
  afterEach(() => {
    mockAxios.reset();
  });

  it('should call axios.post with signUpUrl and data in the body', () => {
    expect(mockAxios.post).toHaveBeenCalledWith(signUpUrl, mockUserInfo);
  });

  it('should receive a success response and extract the message from it', async (done) => {
    const lastReqInfo = mockAxios.lastReqGet();

    await mockResponse(mockSuccessResponseObject, lastReqInfo);
    expect(thenFn).toHaveBeenCalledWith(mockSuccessResponseObject.data.Message);
    expect(catchFn).not.toHaveBeenCalled();
    done();
  });

  it('should extract the first error from error messages sent by the backend', async (done) => {
    const lastReqInfo = mockAxios.lastReqGet();
    await mockError(mockErrorResponseObject, lastReqInfo);
    expect(catchFn).toHaveBeenCalledWith(mockErrorResponseObject.data.errors.email[0]);
    expect(thenFn).not.toHaveBeenCalled();
    done();
  });

  it('should return its own error message if the request data did not provide it', async (done) => {
    // here we call mockError with an empty object to simulate an error not provided by our backend
    const lastReqInfo = mockAxios.lastReqGet();
    await mockError({}, lastReqInfo);
    expect(catchFn).toHaveBeenCalledWith(
      authenticationService.signUpAttributes.defaultErrorMessage,
    );
    expect(thenFn).not.toHaveBeenCalled();
    done();
  });
});
