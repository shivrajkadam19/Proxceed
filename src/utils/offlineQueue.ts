import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Adds a failed request to the offline queue
 */
export const addToOfflineQueue = async (requestConfig) => {
    try {
        let queue = JSON.parse(await AsyncStorage.getItem("offlineQueue")) || [];
        queue.push(requestConfig);
        await AsyncStorage.setItem("offlineQueue", JSON.stringify(queue));
        console.log("📌 Request saved for retry:", requestConfig.url);
    } catch (error) {
        console.error("❌ Failed to save request to offline queue", error);
    }
};

/**
 * Processes all queued offline requests when the internet is restored
 */
export const processOfflineQueue = async (api) => {
    try {
        let queue = JSON.parse(await AsyncStorage.getItem("offlineQueue")) || [];

        if (queue.length === 0) return;

        console.log(`🚀 Processing ${queue.length} offline requests...`);

        let newQueue = []; // To store requests that failed again

        for (let requestConfig of queue) {
            try {
                await api(requestConfig);
                console.log("✅ Offline request sent:", requestConfig.url);
            } catch (error) {
                console.error("❌ Failed to process offline request:", requestConfig.url, error);
                newQueue.push(requestConfig); // Keep failed requests
            }
        }

        // Save only failed requests back to storage
        await AsyncStorage.setItem("offlineQueue", JSON.stringify(newQueue));

        if (newQueue.length === 0) {
            await AsyncStorage.removeItem("offlineQueue"); // Clear storage if all requests succeeded
        }
    } catch (error) {
        console.error("❌ Failed to process offline queue", error);
    }
};
