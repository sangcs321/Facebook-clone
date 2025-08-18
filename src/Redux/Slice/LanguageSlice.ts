import { TranslateModel } from "@Models";
import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    TranslateModel: {} as TranslateModel,
  },
  reducers: {
    setLanguages: (state, action) => {
      state.TranslateModel = action.payload;
    },
  },
});
export const { setLanguages } = languageSlice.actions;
export default languageSlice.reducer;
