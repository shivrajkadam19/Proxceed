// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Zocial from 'react-native-vector-icons/Zocial';

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