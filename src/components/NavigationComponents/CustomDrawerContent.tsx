import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from "../common/Icon";
import { navigate } from "../../utils/NavigationUtil";
import { PADDING_HORIZONTAL, PADDING_TOP } from "../../utils/Constants";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Custom Drawer Content with Animation
const CustomDrawerContent = () => {
  const translateX = useSharedValue(-SCREEN_WIDTH * 0.7);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(translateX.value, { duration: 400 }) }],
    };
  });

  React.useEffect(() => {
    translateX.value = 0;
  }, []);

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyle]}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Vinod Sharma</Text>
      </View>
      <View style={styles.menuContainer}>
        {[
          { label: "My Profile", icon: "user", screen: "Profile", iconFamily: "Feather" as "Feather" },
          { label: "All", icon: "chatbubble-outline", screen: "Messages", iconFamily: "Ionicons" as "Ionicons" },
          { label: "Saved", icon: "bookmark", screen: "Saved", iconFamily: "Feather" as "Feather" },
          { label: "Contact Us", icon: "envelope-o", screen: "Mail", iconFamily: "FontAwesome" as "FontAwesome" },
          { label: "Settings", icon: "cog", screen: "Settings", iconFamily: "FontAwesome" as "FontAwesome" },
          { label: "Help & FAQs", icon: "question-circle-o", screen: "Help", iconFamily: "FontAwesome" as "FontAwesome" },
          { label: "Sign Out", icon: "log-in-outline", screen: "Logout", iconFamily: "Ionicons" as "Ionicons" }
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigate(item.screen)}
          >
            <Icon name={item.icon} size={22} color="#555" style={styles.menuIcon} iconFamily={item.iconFamily} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    width: SCREEN_WIDTH * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  profileContainer: {
    alignItems: "flex-start",
    marginBottom: 30,
    paddingTop: PADDING_TOP,
    paddingHorizontal: PADDING_HORIZONTAL

  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  menuContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: 10
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
