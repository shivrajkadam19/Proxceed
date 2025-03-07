import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store"; // ✅ Import correct types
import { login, logout } from "../slices/authSlice";
import { saveCredentials, clearCredentials } from "../../../utils/keychain";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>(); // ✅ Correctly typed dispatch
    const { user, accessToken } = useSelector((state: RootState) => state.auth);

    const signIn = async (credentials: { email: string; password: string }) => {
        const result = await dispatch(login(credentials)).unwrap(); // ✅ Ensure correct async handling
        await saveCredentials(result.accessToken, result.refreshToken);
    };

    const signOut = async () => {
        dispatch(logout());
        await clearCredentials();
    };

    return { user, isAuthenticated: !!accessToken, signIn, signOut };
};
