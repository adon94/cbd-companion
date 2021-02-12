import { createSlice } from '@reduxjs/toolkit';

const viewingSymptomReducer = createSlice({
  name: 'viewingSymptom',
  initialState: 0,
  reducers: {
    setViewingSymptom: (state, action) => {
      return action.payload;
    },
  },
});

export const { setViewingSymptom } = viewingSymptomReducer.actions;

export default viewingSymptomReducer.reducer;
