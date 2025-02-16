import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { saveCredentials, clearCredentials } from "../../../utils/keychain";

// Async thunk for login
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    await saveCredentials(data.accessToken, data.refreshToken);
    return { accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user };
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null, refreshToken: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      clearCredentials();
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
