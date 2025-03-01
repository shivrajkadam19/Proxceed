import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import syncReducer from "./syncSlice"; // ✅ Add syncSlice (not persisted)

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["user", "accessToken", "refreshToken"],
};

const themePersistConfig = {
  key: "theme",
  storage: AsyncStorage,
  whitelist: ["mode"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  sync: syncReducer, // ✅ No persistence needed for syncing state
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
