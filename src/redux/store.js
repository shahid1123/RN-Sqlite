import {createStore, combineReducer, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';

const rootReducer = combineReducer({userReducer});
export const Store = createStore(rootReducer, applyMiddleware(thunk));
