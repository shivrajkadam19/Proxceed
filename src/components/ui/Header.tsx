import React from "react";
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import Icon from "../common/Icon";
import { openDrawer } from "../../utils/NavigationUtil";

const { width } = Dimensions.get("window");

const Header = ({ placeholder = "Search..." }) => {
    return (
        <View style={styles.container}>
            {/* Profile Avatar */}
            <TouchableOpacity onPress={() => openDrawer()} style={styles.avatarContainer}>
                <Image source={require('../assets/images/profile.png')} style={styles.avatar} />
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder={placeholder} placeholderTextColor="#999" />
                <Icon iconFamily={"Ionicons"} name="mic" size={20} color="#999" />
            </View>

            {/* Notification & Message Icons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Icon iconFamily={"Ionicons"} name="notifications" size={30} color="#333" />
                    <View style={styles.badge}><Text style={styles.badgeText}>4</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Icon iconFamily={"Ionicons"} name="paper-plane" size={30} color="#333" />
                    <View style={styles.badge}><Text style={styles.badgeText}>4</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
    },
    avatarContainer: {
        backgroundColor: '#07919C',
        padding: 2,
        borderRadius: 50,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    iconWrapper: {
        position: "relative",
    },
    badge: {
        position: "absolute",
        right: -5,
        top: -5,
        backgroundColor: "red",
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Header;
