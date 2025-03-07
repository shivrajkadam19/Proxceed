import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { saveCredentials, clearCredentials, getCredentials } from "../../../utils/keychain";

// Define types
interface AuthState {
  user: any | null;
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

// Helper function for storing tokens
const handleAuthSuccess = async (data: any) => {
  await saveCredentials(data.accessToken, data.refreshToken);
  console.log(data.user);
  return { accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user };
};

// **Restore session from stored credentials**
export const restoreSession = createAsyncThunk("auth/restoreSession", async (_, { rejectWithValue }) => {
  try {
    const storedData = await getCredentials();
    if (!storedData) throw new Error("No session found");

    // Process stored data like a fresh login
    return await handleAuthSuccess(storedData);
  } catch (error) {
    return rejectWithValue("Session restoration failed");
  }
});


// **Email/Password Login**
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      return await handleAuthSuccess(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// **Guest Login**
export const guestLogin = createAsyncThunk(
  "auth/guestLogin",
  async (credentials: { mobileNumber: string; otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/guest-login", credentials);
      return await handleAuthSuccess(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Guest login failed");
    }
  }
);

// **Google Login**
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (googleToken: string, { rejectWithValue }) => {
    // console.log("request 2");
    try {
      // console.log("request 3");
      const { data } = await api.post("/auth/google", { idToken: googleToken });
      // console.log("request 4");
      return await handleAuthSuccess(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Google login failed");
    }
  }
);

// **Apple ID Login**
export const appleLogin = createAsyncThunk(
  "auth/appleLogin",
  async (appleToken: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/apple-login", { token: appleToken });
      return await handleAuthSuccess(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Apple login failed");
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
      state.error = null;
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
      // **Restore Session**
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
      })

      // **Email Login**
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
      })

      // **Guest Login**
      .addCase(guestLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(guestLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(guestLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **Google Login**
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **Apple Login**
      .addCase(appleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(appleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(appleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
