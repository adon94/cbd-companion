import { configureStore } from '@reduxjs/toolkit';

import symptoms from './symptomsReducer';
import lifestyle from './lifestyleReducer';
import viewingSymptom from './viewingSymptomReducer';
import user from './userReducer';
import moods from './moodsReducer';
import loaded from './loadedReducer';

export default configureStore({
  reducer: {
    symptoms,
    lifestyle,
    viewingSymptom,
    user,
    moods,
    loaded,
  },
});
