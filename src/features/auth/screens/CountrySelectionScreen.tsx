import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { debounce } from 'lodash';
import { goBack, navigate } from '../../../utils/NavigationUtil';
import FastImage from 'react-native-fast-image'
import Icon from '../../../components/common/Icon';
import { PADDING_HORIZONTAL } from '../../../utils/Constants';

const CountrySelectionScreen = ({ route }: any) => {
    interface Country {
        alpha3Code: string;
        name: string;
        flag: string;
        callingCodes: string[];
    }

    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://restcountries.com/v2/all');
            const formattedData = response.data.map((country: any) => ({
                alpha3Code: country.alpha3Code,
                name: country.name,
                flag: country.flags?.png || '',
                callingCodes: country.callingCodes || ['N/A'],
            }));
            setCountries(formattedData);
            setFilteredCountries(formattedData);
        } catch (err) {
            setError('Failed to fetch countries. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = useCallback(
        debounce((text: string) => {
            setFilteredCountries(
                text
                    ? countries.filter((country) =>
                        country.name.toLowerCase().includes(text.toLowerCase())
                    )
                    : countries
            );
        }, 300),
        [countries]
    );




    const handleSelectCountry = (country: Country) => {
        if (route.params?.onCountrySelect) {
            route.params.onCountrySelect(country);
        }
        goBack();
    };

    if (loading) {
        return (
            <View style={[styles.centered]}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading countries...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.centered, styles.container]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchCountries}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }


    const Header = () => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon iconFamily={'Ionicons'} name="arrow-back-outline" size={25} color={"#9E9E9E"} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#9E9E9E"
                        style={styles.input}
                        value={search}
                        onChangeText={(text) => {
                            setSearch(text);
                            handleSearch(text);
                        }}
                        autoFocus={true}
                    />

                    <Icon iconFamily={'Ionicons'} name="search" size={20} color={"#9E9E9E"} />
                </View>
            </View>

        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.alpha3Code}
                ListHeaderComponent={Header}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.countryItem} onPress={() => handleSelectCountry(item)}>
                        <View style={styles.textContainer}>
                            <FastImage
                                style={styles.flag}
                                source={{
                                    uri: item.flag,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <Text style={styles.countryText}>{item.name}</Text>
                        </View>
                        <Text style={styles.callingCode}>+{item.callingCodes[0]}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    retryButton: {
        paddingVertical: 10,
        paddingHorizontal: PADDING_HORIZONTAL,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    retryText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginBottom: 10,
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
    searchInput: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: PADDING_HORIZONTAL,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
    },
    flag: {
        width: 40,
        height: 25,
        marginRight: 10,
        borderRadius: 4,
    },
    textContainer: {
        flexDirection: 'row',
    },
    countryText: {
        fontSize: 16,
        fontWeight: '500',
    },
    callingCode: {
        fontSize: 14,
        color: '#0000FF',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: PADDING_HORIZONTAL,
        height: 40,
        borderColor: '#000000',
        borderWidth: 1
    },
});

export default CountrySelectionScreen;