import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { saveCredentials, clearCredentials } from "../../../utils/keychain";

// Define types
interface AuthState {
  user: any | null;  // Define a proper user type
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      await saveCredentials(data.accessToken, data.refreshToken);
      return { accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      clearCredentials();
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: any }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
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
        state.error = action.payload as string;
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
