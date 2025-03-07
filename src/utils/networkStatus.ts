import NetInfo from "@react-native-community/netinfo";

let connectionStatus = true;
let listeners: ((isConnected: boolean) => void)[] = [];

/**
 * Fetch initial network status
 */
NetInfo.fetch().then((state) => {
    connectionStatus = state.isConnected ?? false;
});

/**
 * Returns the current network status (true = online, false = offline)
 */
export const getConnectionStatus = (): boolean => {
    return connectionStatus;
};

/**
 * Monitors network status changes and notifies all subscribers
 */
const handleNetworkChange = (state: { isConnected: boolean | null }) => {
    connectionStatus = state.isConnected ?? false;
    listeners.forEach((callback) => callback(connectionStatus));
};

// Subscribe to NetInfo events
NetInfo.addEventListener(handleNetworkChange);

/**
 * Subscribes to network changes and triggers the callback when the status changes.
 */
export const subscribeToNetworkChanges = (callback: (isConnected: boolean) => void) => {
    listeners.push(callback);

    // Call immediately with the current status
    callback(connectionStatus);

    // Return function to unsubscribe
    return () => {
        listeners = listeners.filter((l) => l !== callback);
    };
};
