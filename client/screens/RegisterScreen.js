import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();  // AuthContext function to store user data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("http://10.0.0.7:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      console.log("Register Response:", data);  // Debugging
  
      if (response.status === 201 && data.success) {
        Alert.alert("Success", "Registration successful! Please log in.");
        navigation.replace("Login");  // Navigate to login after successful registration
      } else {
        Alert.alert("Registration Failed", data.message || "Unable to register.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
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
      <Button title={loading ? "Registering..." : "Register"} onPress={handleRegister} disabled={loading} />
      <Text
        style={{ marginTop: 20, color: "blue" }}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login here.
      </Text>
    </View>
  );
}