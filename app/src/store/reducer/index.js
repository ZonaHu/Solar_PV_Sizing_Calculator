import { combineReducers } from '@reduxjs/toolkit';

import formSlice from './formSlice';

const rootReducer = combineReducers({
  stepForm: formSlice,
});

export default rootReducer;
