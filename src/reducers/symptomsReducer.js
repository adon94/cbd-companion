import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSymptoms, changeMultipleSymptoms } from '../api/database';
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

export const sendSymptomEdits = createAsyncThunk(
  'symptoms/sendSymptomEdits',
  async ({ toAdd, toRemove }, { dispatch }) => {
    console.log('sendSymptomEdits', toAdd.length);
    await changeMultipleSymptoms(toAdd, toRemove);
    dispatch(fetchSymptoms());
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
    addSymptom: (state, action) => {
      state.symptoms.push(action.payload);
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
    // sendSymptomEdits
    [sendSymptomEdits.pending]: (state, action) => {
      state.status = 'loading';
    },
    [sendSymptomEdits.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [sendSymptomEdits.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { addSymptom, setAllSymptoms } = symptomsReducer.actions;

export default symptomsReducer.reducer;
