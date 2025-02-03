import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state to prevent flickering

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);  // Ensure app renders after checking storage
      }
    };
    loadUser();
  }, []);

  // useEffect(() => {
  //   const clearStorageAndLoadUser = async () => {
  //     await AsyncStorage.clear();  // ⚠️ Temporarily clear AsyncStorage for debugging
  //     const storedUser = await AsyncStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //     setLoading(false);
  //   };
  //   clearStorageAndLoadUser();
  // }, []);

  // const login = async (userData) => {
  //   await AsyncStorage.setItem('user', JSON.stringify(userData));
  //   setUser(userData);
  // };

  const login = async (userData, token) => {
    if (!userData) {
      console.error("Login Error: No user data provided.");
      return;
    }
  
    await AsyncStorage.setItem('user', JSON.stringify(userData));  // Store user data
    if (token) {
      await AsyncStorage.setItem('token', token);  // Store token separately
    }
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);