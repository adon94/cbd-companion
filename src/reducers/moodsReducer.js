import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoodsBySymptom, addMood as postMood } from '../api/database';

export const fetchMoods = createAsyncThunk(
  'moods/fetchMoods',
  async (symptomName) => {
    const response = await getMoodsBySymptom(symptomName);
    return response;
  },
);

export const sendMoods = createAsyncThunk(
  'moods/sendMoods',
  async ({ symptoms, lifestyleFactors }, { dispatch }) => {
    const response = await postMood(symptoms, lifestyleFactors);
    return response;
  },
);

const moodsReducer = createSlice({
  name: 'moods',
  initialState: {
    moods: [],
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
    [fetchMoods.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchMoods.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'idle',
        moods: action.payload,
      };
    },
    [fetchMoods.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setAllMoods } = moodsReducer.actions;

export default moodsReducer.reducer;
