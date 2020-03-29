import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const StoreContext = createContext();

const initialState = {
  countries: JSON.parse(sessionStorage.getItem('allCountries')) || []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload };
    case 'ERROR':
      return { ...state };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};

StoreProvider.defaultProps = {
  children: {}
};

export const useStore = () => useContext(StoreContext);
