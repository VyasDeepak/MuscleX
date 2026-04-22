import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import LoginScreen from '../Screens/Auth/Login/LoginScreen';
import SignupScreen from '../Screens/Auth/Signup/SignupScreen';
import ExerciseDetailsScreen from '../Screens/ExerciseDetails/ExerciseDetailsScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
