import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addMood as postMood,
  getWeeklyMoods,
  getMoodsBySymptom,
} from '../api/database';

export const fetchWeekMoods = createAsyncThunk(
  'moods/fetchWeekMoods',
  async (symptomName) => {
    const response = await getWeeklyMoods(symptomName);
    return response;
  },
);

export const fetchAllMoods = createAsyncThunk(
  'moods/fetchAllMoods',
  async (symptomName) => {
    const response = await getMoodsBySymptom(symptomName);
    return response;
  },
);

export const sendMoods = createAsyncThunk(
  'moods/sendMoods',
  async ({ symptoms, lifestyleFactors, date }) => {
    const response = await postMood(symptoms, lifestyleFactors, date);
    return response;
  },
);

const moodsReducer = createSlice({
  name: 'moods',
  initialState: {
    moods: [],
    weekMoods: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setAllMoods: (state, action) => {
      return {
        ...state,
        moods: action.payload,
      };
    },
  },
  extraReducers: {
    [fetchWeekMoods.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchWeekMoods.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        weekMoods: action.payload,
      };
    },
    [fetchWeekMoods.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchAllMoods.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllMoods.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        moods: action.payload,
      };
    },
    [fetchAllMoods.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setAllMoods } = moodsReducer.actions;

export default moodsReducer.reducer;
