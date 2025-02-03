import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}