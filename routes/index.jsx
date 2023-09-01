import React from "react";
import { StatusBar } from "react-native";
import { AuthScreen } from "../auth/Auth";
import { LoginScreen } from "../auth/LoginScreen";
import { SignUpScreen } from "../auth/SignUpScreen";
import { HomeScreen } from "../components/HomeScreen";
import { EditScreen } from "../components/EditScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CreateScreen } from "../components/CreateScreen";
import { DetailScreen } from "../components/DetailScreen";
import { ForgetPasswordScreen } from "../auth/ForgetPasswordScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogoutButton } from "../components/LogoutButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#158CB6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#158CB6",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={CreateScreen}
        options={{
          title: "Create",
          headerStyle: {
            backgroundColor: "#158CB6",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditScreen}
        options={{
          headerStyle: {
            backgroundColor: "#158CB6",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarButton: () => null,
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerStyle: {
            backgroundColor: "#158CB6",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarButton: () => null,
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
}

export const Navigation = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
