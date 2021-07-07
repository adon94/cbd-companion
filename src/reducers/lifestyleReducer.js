import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLifestyle, changeMultipleLifestyles } from '../api/database';

export const fetchLifestyle = createAsyncThunk(
  'lifestyle/fetchLifestyle',
  async () => {
    const response = await getLifestyle();
    return response;
  },
);

export const sendLifestyleEdits = createAsyncThunk(
  'lifestyle/sendLifestyleEdits',
  async ({ toAdd, toRemove }, { dispatch }) => {
    await changeMultipleLifestyles(toAdd, toRemove);
    dispatch(fetchLifestyle());
  },
);

const lifestyleReducer = createSlice({
  name: 'lifestyle',
  initialState: {
    lifestyle: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addLifestyle: (state, action) => {
      state.lifestyle.push(action.payload);
    },
    setAllLifestyle: (state, action) => {
      return {
        ...state,
        lifestyle: action.payload,
      };
    },
    removeSelections: (state) => {
      return {
        ...state,
        lifestyle: state.lifestyle.map(({ rating, ...lf }) => lf),
      };
    },
  },
  extraReducers: {
    // fetchSymptoms
    [fetchLifestyle.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchLifestyle.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        lifestyle: action.payload,
      };
    },
    [fetchLifestyle.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // sendSymptomEdits
    [sendLifestyleEdits.pending]: (state, action) => {
      state.status = 'loading';
    },
    [sendLifestyleEdits.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [sendLifestyleEdits.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { addLifestyle, setAllLifestyle, removeSelections } =
  lifestyleReducer.actions;

export default lifestyleReducer.reducer;
