import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store, persistor } from "./app/redux/store.ts";
import RootNavigator from "./navigation/root-navigator";
import { initializeBackgroundSync } from "./services/backgroundSync.ts";
import { fetch } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./utils/NavigationUtil.tsx";


const App = () => {

  useEffect(() => {
    fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  });

  console.log("happy coding");
  useEffect(() => {
    initializeBackgroundSync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;