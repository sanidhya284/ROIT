import { createLogger } from 'redux-logger';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Define your reducers here
const rootReducer = combineReducers({
  user: (state = { isLoggedIn: false, user: null }, action) => {
    switch (action.type) {
      case 'USER_LOGIN':
        return { ...state, isLoggedIn: true, user: action.payload };
      case 'USER_LOGOUT':
        return { ...state, isLoggedIn: false, user: null };
      default:
        return state;
    }
  },
  posts: (state = [], action) => {
    switch (action.type) {
      case 'POSTS_FETCH_SUCCESS':
        return action.payload;
      case 'POSTS_CREATE_SUCCESS':
        return [...state, action.payload];
      default:
        return state;
    }
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});

export default store;