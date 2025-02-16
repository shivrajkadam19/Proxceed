import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSyncing: false,
  offlineQueueSize: 0,
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    startSync: (state) => {
      state.isSyncing = true;
    },
    stopSync: (state) => {
      state.isSyncing = false;
    },
    setOfflineQueueSize: (state, action) => {
      state.offlineQueueSize = action.payload;
    },
  },
});

export const { startSync, stopSync, setOfflineQueueSize } = syncSlice.actions;
export default syncSlice.reducer;
