import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import CreatePostScreen from "../screens/CreatePostScreen";
import { Ionicons } from "@expo/vector-icons"; // ✅ Import icons

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "CreatePost") {
            iconName = "add-circle";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}