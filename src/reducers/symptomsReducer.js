import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSymptoms, changeMultipleSymptoms } from '../api/database';
import { fetchWeekMoods } from './moodsReducer';

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
    dispatch(fetchWeekMoods(response[0].displayName));
    return response;
  },
);

// might do something with this for editing already set data
// not very high priority
// export const getSymptomsOnDay = createAsyncThunk(
//   'symptoms/getSymptomsOnDay',
//   async ({ date, symptom }, { dispatch }) => {
//     const response = await fetchSymptomsOnDay();
//     return response;
//   },
// );

export const sendSymptomEdits = createAsyncThunk(
  'symptoms/sendSymptomEdits',
  async ({ toAdd, toRemove }, { dispatch }) => {
    await changeMultipleSymptoms(toAdd, toRemove);
    dispatch(fetchSymptoms());
  },
);

const symptomsReducer = createSlice({
  name: 'symptoms',
  initialState: {
    symptoms: [],
    selectedDate: new Date().toISOString(),
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
    setSelectedDate: (state, action) => {
      return {
        ...state,
        selectedDate: new Date(action.payload).toISOString(),
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

export const { addSymptom, setAllSymptoms, setSelectedDate } =
  symptomsReducer.actions;

export default symptomsReducer.reducer;
