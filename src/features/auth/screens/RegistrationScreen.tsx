import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PADDING_HORIZONTAL } from '../../../utils/Constants';

const { width } = Dimensions.get('window');

const RegistrationScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log({ username, email, password, confirmPassword });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Username*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    placeholderTextColor={'black'}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Email ID*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={'black'}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={'black'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.label}>Confirm Password*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter your password"
                    placeholderTextColor={'black'}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
                    <Text style={styles.submitText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    form: {
        width: '100%',
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#F1F1F1',
        borderRadius: 25,
        height: 50,
        paddingHorizontal: width * 0.05,
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#07919C',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    },
});

export default RegistrationScreen;
