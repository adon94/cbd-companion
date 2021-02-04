import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    setOnboarded: (state, action) => {
      return {
        ...state,
        onboarded: action.payload,
      };
    },
  },
});

export const { set, setOnboarded } = userReducer.actions;

export default userReducer.reducer;
