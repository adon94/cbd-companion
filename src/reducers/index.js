import { configureStore } from '@reduxjs/toolkit';

import symptoms from './symptomsReducer';
import viewingSymptom from './viewingSymptomReducer';
import user from './userReducer';
import moods from './moodsReducer';
import loaded from './loadedReducer';

export default configureStore({
  reducer: {
    symptoms,
    viewingSymptom,
    user,
    moods,
    loaded,
  },
});
