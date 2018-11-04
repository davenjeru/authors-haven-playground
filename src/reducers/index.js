import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  signUpState: signUpReducer,
},
);

export default rootReducer;
