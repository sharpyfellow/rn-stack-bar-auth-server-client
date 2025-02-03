import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.0.7:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);  // Debugging the response

      if (data.success && data.user && data.token) {
        await login(data.user, data.token);  // Pass both user and token to AuthContext
        Alert.alert("Success", `Welcome, ${data.user.name}!`);
        // No need to navigate manually; RootNavigator will handle it.
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
      <Text
        style={{ marginTop: 20, color: "blue" }}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register here.
      </Text>
    </View>
  );
}