import React, { createContext, useReducer } from 'react';

export const ADD_DOSAGE = 'ADD_DOSAGE';

const initialState = {
  dosage: {
    amount: 0,
    timestamp: '',
  },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case ADD_DOSAGE:
        const { amount, timestamp } = action.payload;
        const newState = {
          ...prevState,
          dosage: { ...prevState.dosage, amount, timestamp },
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
