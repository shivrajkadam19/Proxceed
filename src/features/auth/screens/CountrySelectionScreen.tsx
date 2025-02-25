import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';

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
    const navigation = useNavigation();

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
                flag: country.flags?.svg || '',
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
            if (text) {
                const filtered = countries.filter((country) =>
                    country.name.toLowerCase().includes(text.toLowerCase())
                );
                setFilteredCountries(filtered);
            } else {
                setFilteredCountries(countries);
            }
        }, 300),
        [countries]
    );

    const handleSelectCountry = (country: Country) => {
        if (route.params?.onCountrySelect) {
            route.params.onCountrySelect(country);
        }
        navigation.goBack();
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading countries...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchCountries}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{'< Back'}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                placeholder="Search country..."
                value={search}
                onChangeText={(text) => {
                    setSearch(text);
                    handleSearch(text);
                }}
            />
            <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.alpha3Code}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.countryItem} onPress={() => handleSelectCountry(item)}>
                        <View style={styles.textContainer}>
                            <Image source={{ uri: item.flag }} style={styles.flag} />
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
        paddingHorizontal: 20,
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
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
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
        color: '#666',
    },
});

export default CountrySelectionScreen;
