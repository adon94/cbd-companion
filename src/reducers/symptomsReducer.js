import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSymptoms } from '../api/database';
import { fetchMoods } from './moodsReducer';

export const fetchSymptoms = createAsyncThunk(
  'symptoms/fetchSymptoms',
  async () => {
    const response = await getSymptoms();
    return response;
  },
);

export const fetchSymptomsWithMoods = createAsyncThunk(
  'symptoms/fetchSymptomsWithMoods',
  async (arg, { dispatch }) => {
    const response = await getSymptoms();
    dispatch(fetchMoods(response[0].displayName));
    return response;
  },
);

const symptomsReducer = createSlice({
  name: 'symptoms',
  initialState: {
    symptoms: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      return [
        ...state,
        {
          displayName: action.payload,
        },
      ];
    },
    setAllSymptoms: (state, action) => {
      return {
        ...state,
        symptoms: action.payload,
      };
    },
  },
  extraReducers: {
    // fetchSymptoms
    [fetchSymptoms.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSymptoms.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        symptoms: action.payload,
      };
    },
    [fetchSymptoms.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // fetchSymptomsWithMoods
    [fetchSymptomsWithMoods.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSymptomsWithMoods.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        symptoms: action.payload,
      };
    },
    [fetchSymptomsWithMoods.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { add, setAllSymptoms } = symptomsReducer.actions;

export default symptomsReducer.reducer;
