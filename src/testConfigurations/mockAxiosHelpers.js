/* eslint-disable import/no-extraneous-dependencies */
import mockAxios from 'jest-mock-axios';

/* mockResponse and mockError are asynchronous functions that need to be wrapped
 * around async await
 */
export const mockResponse = async (responseObject = undefined, requestInfo = undefined) => {
  await mockAxios.mockResponse(responseObject, requestInfo);
};

export const mockError = async (err = undefined, requestInfo = undefined) => {
  /* this is to simulate how axios obtains its errors.
   * It expects an object that has a response attribute that holds the response data
   * from the backend
   */
  const errorObject = { response: err };
  await mockAxios.mockError(errorObject, requestInfo);
};
