import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store"; // ✅ Import correct types
import { login, logout, guestLogin, googleLogin, appleLogin, restoreSession } from "../slices/authSlice";
import { clearCredentials } from "../../../utils/keychain";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, accessToken, loading, error } = useSelector((state: RootState) => state.auth);

    // Restore session when hook is first used
    useEffect(() => {
        dispatch(restoreSession()).then((result) => {
            console.log("Restore session result:", result);
        });
    }, [dispatch]);


    const signIn = async (method: "email" | "guest" | "google" | "apple", credentials?: any) => {
        switch (method) {
            case "email":
                return dispatch(login(credentials));
            case "guest":
                return dispatch(guestLogin({ mobileNumber: credentials.mobile, otp: credentials.otp }));
            case "google":
                console.log("reuqest make 1");
                return dispatch(googleLogin(credentials.token));
            case "apple":
                return dispatch(appleLogin(credentials.token));
            default:
                throw new Error("Invalid login method");
        }
    };

    const signOut = async ({ resetAndNavigate }: any) => {
        dispatch(logout());
        await clearCredentials();
        await GoogleSignin.signOut();
        await GoogleSignin.revokeAccess();
        resetAndNavigate('AuthScreen');
    };



    return {
        user,
        isAuthenticated: !!accessToken,
        signIn,
        signOut,
        loading,
        error
    };
};
