import React, { createContext, useReducer, useRef } from 'react';

const initialState = {
  user: null,
  posts: [],
  isLoading: false,
  error: null,
  // Add other initial state properties if needed
};

const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, user: action.payload };
    case 'USER_LOGOUT':
      return { ...state, user: null };
    case 'POSTS_FETCH_REQUESTED':
      return { ...state, isLoading: true, error: null };
    case 'POSTS_FETCH_SUCCEEDED':
      return { ...state, posts: action.payload, isLoading: false };
    case 'POSTS_FETCH_FAILED':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
