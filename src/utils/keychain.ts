import * as Keychain from "react-native-keychain";

// Save credentials securely
export const saveCredentials = async (accessToken, refreshToken) => {
    try {
        await Keychain.setGenericPassword("auth", JSON.stringify({ accessToken, refreshToken }));
    } catch (error) {
        console.error("Error saving credentials:", error);
    }
};

// Retrieve credentials
export const getCredentials = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        return credentials ? JSON.parse(credentials.password) : null;
    } catch (error) {
        console.error("Error getting credentials:", error);
        return null;
    }
};

// Delete credentials
export const clearCredentials = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error("Error clearing credentials:", error);
    }
};
