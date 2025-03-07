import React, { useMemo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomDrawerContent from "../components/NavigationComponents/CustomDrawerContent";
import CustomStatusBar from '../components/common/CustomStatusBar';
import { SCREEN_WIDTH } from "../utils/Constants";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <SafeAreaProvider>
            <CustomStatusBar />
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: { width: SCREEN_WIDTH * 0.7 },
                    overlayColor: "transparent",
                    swipeEnabled: false
                }}
                drawerContent={(props) => React.useMemo(() => <CustomDrawerContent {...props} />, [props])}
            >
                <Drawer.Screen name="Tabs" component={TabNavigator} />
            </Drawer.Navigator>
        </SafeAreaProvider>
    );
}
