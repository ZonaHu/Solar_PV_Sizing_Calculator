import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  form1: {},
  form2: {},
  form3: {},
  form4: {},
};

export const formSlice = createSlice({
  name: 'stepForm',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    updateForm: (state, action) => {
      const { step } = state
      const form = action.payload;
      switch (step) {
        case 0:
          state.form1 = form;
          break;
        case 1:
          state.form2 = form;
          break;
        case 2:
          state.form3 = form;
          break;
        case 3:
          state.form4 = form;
          break;
        default:
          break;
      }
    },
    resetForm: (state) => {
      state.step = 0;
      state.form1 = {};
      state.form2 = {};
      state.form3 = {};
      state.form4 = {};
    },
  },
});

export const {
  nextStep: nextStepAction,
  prevStep: prevStepAction,
  setStep: setStepAction,
  updateForm: updateFormAction,
} = formSlice.actions;

export default formSlice.reducer;
