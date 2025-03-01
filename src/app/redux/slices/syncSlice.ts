import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSyncing: false,
  offlineQueueSize: 0,
  isConnected: true,  // Track network status
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    startSync: (state) => { state.isSyncing = true; },
    stopSync: (state) => { state.isSyncing = false; },
    setOfflineQueueSize: (state, action) => { state.offlineQueueSize = action.payload; },
    setNetworkStatus: (state, action) => { state.isConnected = action.payload; }
  },
});

export const { startSync, stopSync, setOfflineQueueSize, setNetworkStatus } = syncSlice.actions;
export default syncSlice.reducer;
