import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials, saveCredentials, clearCredentials } from "../utils/keychain";
import { setTokens, logout } from "../app/redux/slices/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const { accessToken, user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthState = async () => {
            setIsLoading(true);
            try {
                const credentials = await getCredentials();
                if (credentials?.accessToken) {
                    dispatch(setTokens(credentials));
                }
            } catch (error) {
                console.error("Error loading auth state:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthState();
    }, [dispatch]);

    const login = async (tokenData, userData) => {
        try {
            await saveCredentials(tokenData.accessToken, tokenData.refreshToken);
            dispatch(setTokens({ accessToken: tokenData.accessToken, refreshToken: tokenData.refreshToken, user: userData }));
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logoutUser = async () => {
        try {
            await clearCredentials();
            dispatch(logout());
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return { accessToken, user, isAuthenticated: !!accessToken, isLoading, login, logout: logoutUser };
};

export default useAuth;
