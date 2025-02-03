import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useAuth();  // Check user and loading state

  if (loading) {
    // Show loading indicator while checking AsyncStorage
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="AppTabs" component={AppTabs} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}