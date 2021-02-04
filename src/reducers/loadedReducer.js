import { createSlice } from '@reduxjs/toolkit';

const loadingReducer = createSlice({
  name: 'loading',
  initialState: 0,
  reducers: {
    addLoading: (state) => {
      return state + 1;
    },
    removeLoading: (state) => {
      return state === 0 ? state : state - 1;
    },
  },
});

export const { addLoading, removeLoading } = loadingReducer.actions;

export default loadingReducer.reducer;
