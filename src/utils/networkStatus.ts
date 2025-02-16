import NetInfo from "@react-native-community/netinfo";

let connectionStatus = true;
let listeners = [];

// Initialize network status
NetInfo.fetch().then((state) => {
    connectionStatus = state.isConnected;
});

/**
 * Returns the current network status (true = online, false = offline)
 */
export const getConnectionStatus = () => connectionStatus;

/**
 * Subscribes a callback to network status changes
 */
export const subscribeToNetworkChanges = (callback) => {
    listeners.push(callback);
};

/**
 * Monitors network status changes and notifies all subscribers
 */
NetInfo.addEventListener((state) => {
    connectionStatus = state.isConnected;
    listeners.forEach((callback) => callback(state.isConnected));
});


