import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store, persistor } from "./app/redux/store.ts";
import RootNavigator from "./navigation/root-navigator";
import { initializeBackgroundSync } from "./services/backgroundSync.ts";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./utils/NavigationUtil.tsx";
import { setTheme } from "./app/redux/slices/themeSlice.ts";
import { Appearance, View } from "react-native";


const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheme(Appearance.getColorScheme()));

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setTheme(colorScheme));
    });

    return () => subscription.remove();
  }, [dispatch]);

  return <View />;
};

const App = () => {

  console.log("happy coding");
  useEffect(() => {
    initializeBackgroundSync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <ThemeInitializer /> */}
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>                                                                                                                    
    </Provider>
  );
};

export default App;