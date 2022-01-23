import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SettingsState {
  emojiMode: boolean;
}

export const initialState: SettingsState = {
  emojiMode: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleEmojiMode: (state) => {
      state.emojiMode = !state.emojiMode;
    },
  },
});

export default settingsSlice.reducer;

export const { toggleEmojiMode } = settingsSlice.actions;

export const selectSettings = (state: RootState) => {
  return state.settings;
};
