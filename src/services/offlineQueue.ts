import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

/**
 * Adds a failed request to the offline queue
 */
export const addToOfflineQueue = async (requestConfig: AxiosRequestConfig) => {
    try {
        let queue: AxiosRequestConfig[] = JSON.parse((await AsyncStorage.getItem("offlineQueue")) || "[]");
        queue.push(requestConfig);
        await AsyncStorage.setItem("offlineQueue", JSON.stringify(queue));
        console.log("📌 Request saved for retry:", requestConfig.url);
    } catch (error) {
        console.error("❌ Failed to save request to offline queue:", error);
    }
};

/**
 * Processes all queued offline requests when internet is restored.
 */
export const processOfflineQueue = async (api: AxiosInstance) => {
    try {
        let queue: AxiosRequestConfig[] = JSON.parse((await AsyncStorage.getItem("offlineQueue")) || "[]");

        if (queue.length === 0) {
            console.log("📭 No offline requests to process.");
            return;
        }

        console.log(`🚀 Processing ${queue.length} offline requests...`);

        let newQueue: AxiosRequestConfig[] = [];

        for (let requestConfig of queue) {
            try {
                await api(requestConfig); // ✅ Ensure API instance is passed here
                console.log("✅ Offline request sent:", requestConfig.url);
            } catch (error) {
                console.error("❌ Failed to process offline request:", requestConfig.url, error);
                newQueue.push(requestConfig); // Keep failed requests in queue
            }
        }

        if (newQueue.length > 0) {
            await AsyncStorage.setItem("offlineQueue", JSON.stringify(newQueue));
        } else {
            await AsyncStorage.removeItem("offlineQueue"); // ✅ Clear queue if all requests succeeded
        }
    } catch (error) {
        console.error("❌ Failed to process offline queue:", error);
    }
};

/**
 * Returns the number of requests in the offline queue.
 */
export const getOfflineQueueCount = async (): Promise<number> => {
    try {
        let queue: AxiosRequestConfig[] = JSON.parse((await AsyncStorage.getItem("offlineQueue")) || "[]");
        return queue.length;
    } catch (error) {
        console.error("❌ Failed to get offline queue count:", error);
        return 0;
    }
};
