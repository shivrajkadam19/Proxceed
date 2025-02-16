import { addNetworkListener, getConnectionStatus } from "../utils/networkStatus";
import { processOfflineQueue, getOfflineQueueCount,} from "../utils/offlineQueue";
import { store } from "../app/redux/store";
import { startSync, stopSync, setOfflineQueueSize } from "../app/redux/slices/syncSlice";

let unsubscribeNetworkListener = null;

export const initializeBackgroundSync = async () => {
    const queueSize = await getOfflineQueueCount();
    store.dispatch(setOfflineQueueSize(queueSize));

    unsubscribeNetworkListener = addNetworkListener(async (isConnected) => {
        if (isConnected) {
            store.dispatch(startSync());
            console.log("Internet restored, processing offline requests...");
            await processOfflineQueue();
            store.dispatch(stopSync());
            store.dispatch(setOfflineQueueSize(0));
        }
    });
};

export const stopBackgroundSync = () => {
    if (unsubscribeNetworkListener) {
        unsubscribeNetworkListener();
    }
};
