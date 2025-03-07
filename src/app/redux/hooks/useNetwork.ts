import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setNetworkStatus } from "../slices/syncSlice";

export const useNetwork = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector((state: { sync: { isConnected: boolean } }) => state.sync.isConnected);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            dispatch(setNetworkStatus(state.isConnected));
        });

        return () => unsubscribe();
    }, [dispatch]);

    return { isConnected };
};
