import { Dimensions, Platform, StatusBar } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

// Screen Dimensions
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;

// Padding, Margin, and Gap Constants
export const PADDING = SCREEN_HEIGHT * 0.05;
export const PADDING_HORIZONTAL = SCREEN_WIDTH * 0.05;
export const PADDING_TOP = StatusBar.currentHeight || SCREEN_HEIGHT * 0.05;
export const PADDING_BOTTOM = SCREEN_HEIGHT * 0.02;
export const PADDING_SMALL = 8;
export const PADDING_MEDIUM = 16;
export const PADDING_LARGE = 24;

export const MARGIN_SMALL = 8;
export const MARGIN_MEDIUM = 16;
export const MARGIN_LARGE = 24;

export const GAP_SMALL = 8;
export const GAP_MEDIUM = 16;
export const GAP_LARGE = 24;

// Platform Checks
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

// Colors
export const COLORS = {
  PRIMARY: "#007bff",
  SECONDARY: "#6c757d",
  SUCCESS: "#28a745",
  ERROR: "#dc3545",
  WARNING: "#ffc107",
  INFO: "#17a2b8",
  LIGHT: "#f8f9fa",
  DARK: "#343a40",
  WHITE: "#ffffff",
  BLACK: "#000000",
};

// Font Sizes
export const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
};

// Permissions
export const requestPhotoPermission = async () => {
  if (!IS_IOS) return;
  try {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    console.log(
      result === RESULTS.GRANTED
        ? "STORAGE PERMISSION GRANTED ✅"
        : "STORAGE PERMISSION DENIED ❌"
    );
  } catch (error) {
    console.error("Error requesting permission:", error);
  }
};

export const requestCameraPermission = async () => {
  try {
    const permission = IS_IOS
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
    const result = await request(permission);
    console.log(
      result === RESULTS.GRANTED
        ? "CAMERA PERMISSION GRANTED ✅"
        : "CAMERA PERMISSION DENIED ❌"
    );
  } catch (error) {
    console.error("Error requesting camera permission:", error);
  }
};

// Validation
export const isBase64 = (str: string) => {
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
};

export const validatePassword = (password: string) => {
  const errors = [];

  if (password.length < 8) errors.push("Password must be at least 8 characters.");
  if (!/[A-Z]/.test(password)) errors.push("Password must have at least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("Password must have at least one lowercase letter.");
  if (!/\d/.test(password)) errors.push("Password must have at least one number.");
  if (!/[@$!%*?&]/.test(password)) errors.push("Password must have at least one special character (@$!%*?&).");

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
};
