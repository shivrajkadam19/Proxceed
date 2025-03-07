import * as Keychain from "react-native-keychain";

export const saveCredentials = async (accessToken: string, refreshToken: string) => {
    try {
        await Keychain.setGenericPassword("auth", JSON.stringify({ accessToken, refreshToken }));
    } catch (error) {
        console.error("Error saving credentials:", error);
    }
};

export const getCredentials = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        return credentials ? JSON.parse(credentials.password) : null;
    } catch (error) {
        console.error("Error getting credentials:", error);
        return null;
    }
};

export const clearCredentials = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error("Error clearing credentials:", error);
    }
};
