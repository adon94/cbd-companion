import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDose, getLastDoseInfo } from '../api/database';

export const sendDose = createAsyncThunk(
  'dose/sendDose',
  async (dose, { getState }) => {
    const {
      dose: {
        last: { lastDosedAt },
      },
      symptoms: { symptoms },
    } = getState();
    const symptomNames = symptoms.map((symp) => symp.displayName);
    await addDose(dose, lastDosedAt, symptomNames);
  },
);

export const fetchDoseInfo = createAsyncThunk(
  'dose/fetchDoseInfo',
  async () => {
    const response = await getLastDoseInfo();
    return response;
  },
);

const doseReducer = createSlice({
  name: 'dose',
  initialState: {
    doseInfo: {
      dosedAt: new Date().toISOString(),
      mg: '',
      ml: '',
      doseAmount: '1 drop',
      product: '',
      brand: '',
    },
    last: {
      lastDosedAt: '',
      lastProduct: '',
      lastBrand: '',
      lastDoseAmount: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setDoseInfo: (state, action) => {
      return {
        ...state,
        doseInfo: action.payload,
      };
    },
  },
  extraReducers: {
    // sendDose
    [sendDose.pending]: (state, action) => {
      state.status = 'loading';
    },
    [sendDose.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [sendDose.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // fetchDoseInfo
    [fetchDoseInfo.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchDoseInfo.fulfilled]: (state, action) => {
      const {
        lastBrand,
        lastDosedAt,
        lastDoseAmount,
        lastProduct,
        lastMg,
        lastMl,
      } = action.payload;
      const l = new Date(lastDosedAt);
      const dosedAt = lastDosedAt
        ? new Date(
            new Date(new Date().setHours(l.getHours())).setMinutes(
              l.getMinutes(),
            ),
          ).toISOString()
        : new Date().toISOString();
      return {
        ...state,
        status: 'idle',
        last: {
          ...state.last,
          lastBrand,
          lastDosedAt,
          lastDoseAmount,
          lastProduct,
          lastMg,
          lastMl,
        },
        doseInfo: {
          ...state.doseInfo,
          dosedAt,
          mg: state.doseInfo.mg ? state.doseInfo.mg : lastMg,
          ml: state.doseInfo.ml ? state.doseInfo.ml : lastMl,
          doseAmount: state.doseInfo.lastDoseAmount
            ? state.doseInfo.doseAmount
            : lastDoseAmount,
          product: state.doseInfo.product
            ? state.doseInfo.product
            : lastProduct,
          brand: state.doseInfo.brand ? state.doseInfo.brand : lastBrand,
        },
      };
    },
    [fetchDoseInfo.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setDoseInfo } = doseReducer.actions;

export default doseReducer.reducer;
