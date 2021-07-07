import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDose, getLastDoseInfo } from '../api/database';
import { convertToMg } from '../core/utils';

export const sendDose = createAsyncThunk(
  'dose/sendDose',
  async (dose, { getState }) => {
    const {
      dose: {
        last: { lastDosedAt, measurement },
      },
      symptoms: { symptoms },
    } = getState();
    const symptomNames = symptoms.map((symp) => symp.displayName);
    await addDose({ ...dose, measurement }, lastDosedAt, symptomNames);
  },
);

export const fetchDoseInfo = createAsyncThunk(
  'dose/fetchDoseInfo',
  async () => {
    const response = await getLastDoseInfo();
    return response;
  },
);

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const drops = range(1, 100);
const ml = drops.map((drop) => Math.round(drop * 0.05 * 100) / 100);

const doseReducer = createSlice({
  name: 'dose',
  initialState: {
    options: {
      drops,
      ml,
      mg: [],
      index: 0,
    },
    doseInfo: {
      dosedAt: new Date().toISOString(),
      mg: '',
      ml: '',
      doseMg: '',
      product: '',
      brand: '',
      measurement: 'ml',
    },
    last: {
      lastDosedAt: '',
      lastProduct: '',
      lastBrand: '',
      lastDoseMg: 1,
      lastMg: '',
      lastMl: '',
      measurement: 'ml',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setDoseInfo: (state, action) => {
      const { index, ...doseInfo } = action.payload;
      const mg = state.options.drops.map((drop) =>
        Math.round(convertToMg(drop, 'drops', doseInfo.ml, doseInfo.mg)),
      );
      return {
        ...state,
        doseInfo,
        options: { ...state.options, index, mg },
      };
    },
    setMeasurement: (state, action) => {
      const m = action.payload;
      const quantity = state.options[m][state.options.index];
      return {
        ...state,
        doseInfo: {
          ...state.doseInfo,
          measurement: m,
          doseMg:
            m === 'mg'
              ? quantity
              : convertToMg(quantity, m, state.doseInfo.ml, state.doseInfo.mg),
        },
        last: { ...state.last, measurement: m },
      };
    },
    setDoseAmount: (state, action) => {
      return {
        ...state,
        doseInfo: { ...state.doseInfo, doseMg: action.payload },
      };
    },
  },
  extraReducers: {
    // sendDose
    [sendDose.pending]: (state) => {
      state.status = 'loading';
    },
    [sendDose.fulfilled]: (state) => {
      state.status = 'idle';
    },
    [sendDose.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // fetchDoseInfo
    [fetchDoseInfo.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDoseInfo.fulfilled]: (state, action) => {
      const {
        lastBrand,
        lastDosedAt,
        lastDoseMg = 1,
        lastProduct,
        lastMg,
        lastMl,
        measurement = 'ml',
      } = action.payload;
      const l = new Date(lastDosedAt);
      const dosedAt = lastDosedAt
        ? new Date(
            new Date(new Date().setHours(l.getHours())).setMinutes(
              l.getMinutes(),
            ),
          ).toISOString()
        : new Date().toISOString();
      const mg = state.options.drops.map((drop) =>
        Math.round(convertToMg(drop, 'drops', lastMl, lastMg)),
      );
      return {
        ...state,
        status: 'idle',
        options: {
          ...state.options,
          mg: state.options.drops.map((drop) =>
            Math.round(convertToMg(drop, 'drops', lastMl, lastMg)),
          ),
          index: mg.indexOf(lastDoseMg),
        },
        last: {
          ...state.last,
          lastBrand,
          lastDosedAt,
          lastDoseMg,
          lastProduct,
          lastMg,
          lastMl,
          measurement,
        },
        doseInfo: {
          ...state.doseInfo,
          dosedAt,
          mg: state.doseInfo.mg ? state.doseInfo.mg : lastMg,
          ml: state.doseInfo.ml ? state.doseInfo.ml : lastMl,
          doseMg: state.doseInfo.lastDoseMg
            ? state.doseInfo.doseMg
            : lastDoseMg,
          product: state.doseInfo.product
            ? state.doseInfo.product
            : lastProduct,
          brand: state.doseInfo.brand ? state.doseInfo.brand : lastBrand,
          measurement,
        },
      };
    },
    [fetchDoseInfo.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setDoseInfo, setMeasurement, setDoseAmount } =
  doseReducer.actions;

export default doseReducer.reducer;
