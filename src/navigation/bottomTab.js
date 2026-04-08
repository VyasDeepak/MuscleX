
import React from "react";
import { View, Image, Dimensions, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { imagespath } from "../theme/imagespath";
import HomeScreen from "../Screens/AppScreen/HomeScreen";
import ChatScreen from "../Screens/AppScreen/ChatScreen";
import CreatePost from "../Screens/AppScreen/CreatePost";
import Profile from "../Screens/AppScreen/Profile";
import Settings from "../Screens/AppScreen/Settings";
import EditProfile from "../Screens/AppScreen/EditProfile";
import { Colors, fonts } from "../theme/Colors";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const DeviceW = Dimensions.get("screen").width;

const RenderTabIcons = ({ icon, activeIcon, isFocused, name, height = 24, width = 24, bg }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      width: DeviceW / 4,
      height: 60,
    }}>
    <Image
      source={isFocused ? activeIcon : icon}
      style={{
        height,
        width,
        resizeMode: "contain",
        tintColor: bg === false ? null : "#222",
        marginRight: isFocused ? 8 : 0,
        opacity: isFocused ? 1 : 0.5,
      }}
    />
  </View>
);
const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerTitleAlign: "left",
        headerTransparent: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

const Drlistbottom = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTransparent: false,
      }}
    />
  </Stack.Navigator>
);

const CreatePostBottom = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#F9F4F8",
      },
      headerTitleStyle: {
        fontFamily: fonts.robot_medium,
        fontSize: fonts.font_size_16,
      },
    }}>
    <Stack.Screen
      name="CreatePost"
      component={CreatePost}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

const ProfileBottom = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
        headerTitleAlign: "Left",
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

const SettingsBottom = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

export const BottomTab = (props) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        headerShadowVisible: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 83 : 70,
          backgroundColor: Colors.BG_COLOR,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 20,
          paddingTop: Platform.OS === "ios" ? 18 : 10,
        },
        headerBackVisible: false,
        headerBackTitleVisible: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Homebottom"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "",
          keyboardHidesTabBar: true,
          tabBarIcon: ({ focused }) => (
            <RenderTabIcons
              icon={imagespath.bottom_home}
              activeIcon={imagespath.bottom_home}
              name={"Home"}
              isFocused={focused}
              width={22}
              height={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Drlistbottom"
        component={Drlistbottom}
        options={{
          tabBarLabel: "",
          keyboardHidesTabBar: true,
          tabBarIcon: ({ focused }) => (
            <RenderTabIcons
              icon={imagespath?.chat_bottom}
              activeIcon={imagespath?.chat_bottom}
              name={"Doctors"}
              isFocused={focused}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            if (props.navigation) {
              props.navigation.navigate("Mycart");
            }
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostBottom"
        component={CreatePostBottom}
        options={{
          tabBarLabel: "",
          keyboardHidesTabBar: true,
          headerTransparent: false,
          headerBackTitleVisible: true,
          headerbackTcolor: "#000",
          tabBarIcon: ({ focused }) => (
            <RenderTabIcons
              icon={imagespath.create_post}
              activeIcon={imagespath.create_post}
              name={"Recipes"}
              bg={false}
              isFocused={focused}
              width={30}
              height={30}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent flicker or unwanted navigation reset
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="Profilebottom"
        component={ProfileBottom}
        options={{
          tabBarLabel: "",
          keyboardHidesTabBar: true,
          tabBarIcon: ({ focused }) => (
            <RenderTabIcons
              icon={imagespath?.profile_bottom}
              activeIcon={imagespath?.profile_bottom}
              name={"Profile"}
              isFocused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingsBottom"
        component={SettingsBottom}
        options={{
          tabBarLabel: "",
          keyboardHidesTabBar: true,
          tabBarIcon: ({ focused }) => (
            <RenderTabIcons
              icon={imagespath?.help_bottom}
              activeIcon={imagespath?.help_bottom}
              name={"Settings"}
              isFocused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
