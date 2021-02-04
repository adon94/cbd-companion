import { createSlice } from '@reduxjs/toolkit';

const viewingSymptomReducer = createSlice({
  name: 'viewingSymptom',
  initialState: 0,
  reducers: {
    setViewingSymptom: (state, action) => {
      return { ...state, email: action.payload.email };
    },
  },
});

export const { setViewingSymptom } = viewingSymptomReducer.actions;

export default viewingSymptomReducer.reducer;
