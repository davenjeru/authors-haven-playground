// initialize the user information that should be sent in the request body in the sign-up route
export const mockUserInfo = {
  email: 'test@email.com',
  username: 'testUsername',
  password: 'testPassword',
};

// model the response object according to our backend specification
// notice the capital M in Message
export const mockSuccessResponseObject = {
  data:
    { Message: 'Check your email for further instructions' },
};

// the backend models the errors into an object whose attributes are arrays
// the front end should extract the first error
export const mockErrorResponseObject = {
  data: {
    errors: {
      email: ['Email already exists, please login or use a different email'],
      username: ['Username already exists, please enter a different username'],
    },
  },
};
