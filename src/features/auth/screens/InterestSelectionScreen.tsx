import { isEmpty } from "lodash";
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Dimensions,
    PixelRatio,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PADDING_HORIZONTAL } from "../../../utils/Constants";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const interests = [
    "Dental", "Medical", "Veterinary",
    "Allied Health Sciences", "Technology",
    "Business", "Finance", "Law",
    "Science & Research", "Arts & Design",
    "Media & Communication", "Hospitality & Tourism",
    "Creative & Performing Arts", "Sports",
    "Education & Academics"
];

const InterestSelectionScreen = () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    console.log(selectedInterests);

    const toggleSelection = (item: string) => {
        setSelectedInterests(prev => {
            if (prev.includes(item)) {
                return prev.filter(i => i !== item);
            } else if (prev.length < 5) {
                return [...prev, item];
            }
            return prev;
        });
    };

    // Sort interests: Selected first, then unselected
    const sortedInterests = [
        ...selectedInterests,
        ...interests.filter(item => !selectedInterests.includes(item)),
    ];

    return (
        <ScrollView contentContainerStyle={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        }}>

            <View style={{
                flex:1,

            }}>
                <LinearGradient colors={["#ffffff", "#329298"]} >
                    <View><Text>kjbjb</Text></View>
                </LinearGradient>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>"Select Your Area of Interest"</Text>
                <Text style={styles.subtitle}>
                    Let us know your professional interests to tailor your experience
                </Text>
                <View style={styles.chipContainer}>
                    {sortedInterests.map((item) => {
                        const isSelected = selectedInterests.includes(item);
                        return (
                            <Pressable
                                key={item}
                                onPress={() => toggleSelection(item)}
                                style={[
                                    styles.option,
                                    isSelected && styles.selectedOption,
                                ]}
                            >
                                <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                                    {item}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

            </View>
            {
                isEmpty(selectedInterests) ?
                    (<Text style={styles.subtitle}>Select any five</Text>)
                    :
                    (<Text style={styles.subtitle}>{selectedInterests.length}/5</Text>)
            }

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    title: {
        fontSize: scaleFont(24),
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Manrope'
    },
    subtitle: {
        fontSize: scaleFont(16),
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: 'Manrope',
        fontWeight: 600,
    },
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: 'flex-start'
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginVertical: 5,
        minWidth: 80,
    },
    selectedOption: {
        backgroundColor: "#a2e3f6",
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "#D9D9D9",
        marginRight: 8,
    },
    selectedCircle: {
        borderColor: "#07919C",
        backgroundColor: "#07919C",
    },
    optionText: {
        fontSize: scaleFont(12),
        color: "#333",
        fontWeight: 500,
        textAlign: 'center'
    },
    selectedText: {
        color: "#fff",
    },
});

export default InterestSelectionScreen;
