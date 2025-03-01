import { getConnectionStatus, subscribeToNetworkChanges } from "../utils/networkStatus";
import { processOfflineQueue, getOfflineQueueCount } from "./offlineQueue";
import { store } from "../app/redux/store";
import { startSync, stopSync, setOfflineQueueSize } from "../app/redux/slices/syncSlice";
import api from "../utils/api"; // Ensure API instance is imported

let unsubscribeNetworkListener: (() => void) | null = null;

/**
 * Initializes background sync to process offline requests when the internet is restored.
 */
export const initializeBackgroundSync = async () => {
    try {
        const queueSize = await getOfflineQueueCount();
        store.dispatch(setOfflineQueueSize(queueSize));

        unsubscribeNetworkListener = subscribeToNetworkChanges(async (isConnected) => {
            if (isConnected) {
                store.dispatch(startSync());
                console.log("🌐 Internet restored, processing offline requests...");

                try {
                    await processOfflineQueue(api); // ✅ Ensure API instance is passed
                } catch (error) {
                    console.error("❌ Error processing offline queue:", error);
                }

                store.dispatch(stopSync());

                const updatedQueueSize = await getOfflineQueueCount();
                store.dispatch(setOfflineQueueSize(updatedQueueSize));
            }
        });
    } catch (error) {
        console.error("❌ Failed to initialize background sync:", error);
    }
};

/**
 * Stops the background sync and unsubscribes from network changes.
 */
export const stopBackgroundSync = () => {
    if (unsubscribeNetworkListener) {
        unsubscribeNetworkListener();
        unsubscribeNetworkListener = null;
    }
};
