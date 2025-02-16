import axios from "axios";
import { getCredentials, saveCredentials, clearCredentials } from "../utils/keychain";
import { addToOfflineQueue, processOfflineQueue } from "../utils/offlineQueue";
import { store } from "../app/redux/store";
import { logout, setTokens } from "../app/redux/slices/authSlice";
import { getConnectionStatus, subscribeToNetworkChanges } from "../utils/networkStatus";

const API_BASE_URL = "https://your-api.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Automatic sync when internet is restored
subscribeToNetworkChanges(async (isOnline) => {
  if (isOnline) {
    console.log("🌐 Internet restored! Syncing offline requests...");
    await processOfflineQueue(api);
  }
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const credentials = await getCredentials();
  if (credentials?.accessToken) {
    config.headers.Authorization = `Bearer ${credentials.accessToken}`;
  }

  // If offline, save request for later retry
  if (!getConnectionStatus()) {
    console.warn("⚠️ No internet, queuing request...");
    await addToOfflineQueue(config);
    return Promise.reject({ message: "No internet connection" });
  }

  return config;
});

// Response interceptor for token refresh & retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const credentials = await getCredentials();
        if (!credentials?.refreshToken) {
          console.warn("🚫 No refresh token available, logging out...");
          store.dispatch(logout());
          await clearCredentials();
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: credentials.refreshToken,
        });

        console.log("🔄 Token refreshed successfully.");

        await saveCredentials(data.accessToken, data.refreshToken);
        store.dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));

        isRefreshing = false;
        onTokenRefreshed(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Retry failed request
      } catch (refreshError) {
        console.error("❌ Token refresh failed, logging out user.");
        store.dispatch(logout());
        await clearCredentials();
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    // Handle request failure & retry logic
    if (!getConnectionStatus()) {
      console.warn("⚠️ No internet, retrying request later...");
      await addToOfflineQueue(originalRequest);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
