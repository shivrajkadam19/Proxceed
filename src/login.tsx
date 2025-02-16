import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";

const LoginScreen = () => {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            login(data, data.user);
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            {loading && <ActivityIndicator />}
        </View>
    );
};

export default LoginScreen;
