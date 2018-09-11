import configureStore from 'redux-mock-store';
import * as testActions from '../actions/testActions';
import * as actionTypes from '../actions/types';

const middlewares = [];
const mockStore = configureStore(middlewares);
let store;
const type = 'type';

describe('The Test Actions', () => {
  beforeEach(
    () => {
      store = mockStore({});
    },
  );
  it('should dispatch the addTestText action', () => {
    store.dispatch(testActions.addTestText());
    const receivedActions = store.getActions();
    expect(receivedActions).toHaveLength(1);
    expect(receivedActions[0])
      .toHaveProperty(type);
    expect(receivedActions[0].type).toEqual(actionTypes.ADD_TEST_TEXT);
  });

  it('should dispatch the removeTestText action', () => {
    store.dispatch(testActions.removeTestText());
    const receivedActions = store.getActions();
    expect(receivedActions).toHaveLength(1);
    expect(receivedActions[0]).toHaveProperty(type);
    expect(receivedActions[0].type).toEqual(actionTypes.REMOVE_TEST_TEXT);
  });
});
