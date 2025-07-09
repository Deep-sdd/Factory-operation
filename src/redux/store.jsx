import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// REMOVE devtools for now

import userReducer from './slices/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware) // Use without devtools
);

export default store;
