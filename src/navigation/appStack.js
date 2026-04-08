import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { BottomTab } from "./bottomTab";
import ImageController from "../imageController";
import DesignSelectionScreen from "../Screens/AppScreen/CreatePost/DesignSelectionScreen";
import { fonts } from "../theme/Colors";

const options = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackVisible: false,
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
      headerTransparent: false,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#F9F4F8",
      },
      headerTitleStyle: {
        fontFamily: fonts.robot_medium,
        fontSize: fonts.font_size_16,
      },
    }}
    initialRouteName="BottomTab"
  >
    <Stack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{ ...options, headerShown: false }}
    />
    <Stack.Screen
      name="DesignSelection"
      component={DesignSelectionScreen}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTransparent: false,
        headerBackTitle: true,
      }}
    />
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="ImageController"
        component={ImageController}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default AppStack;
