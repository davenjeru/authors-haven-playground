/* eslint-disable import/no-extraneous-dependencies,no-unused-vars */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const configureMockStore = configureStore(middlewares);

export default configureMockStore;
