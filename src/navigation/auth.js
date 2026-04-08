import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BottomTab } from "./bottomTab";
import Login from "../Screens/Authscreens/Login";
import OtpScreen from "../Screens/Authscreens/OtpScreen";
import { fonts } from "../theme/Colors";
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();

// Patient Routes
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShadowVisible: false,
      
        headerTransparent: false,
        headerStyle: {
          backgroundColor: "#F9F4F8",
        },
        headerTitleStyle: {
          fontFamily: fonts.robot_medium,
          fontSize: fonts.font_size_16,
        },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ ...options, headerShown: false }}
      />

      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{
          headerTransparent: false,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#F9F4F8",
          },
          // ...options,
          headerShown: true,
          title: "Verification Code",
        
          headerBackVisible: true,
          // headerTintColor: "red",
          // headerTransparent: true,
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};
