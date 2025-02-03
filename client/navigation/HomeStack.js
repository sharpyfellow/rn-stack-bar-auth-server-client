import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}