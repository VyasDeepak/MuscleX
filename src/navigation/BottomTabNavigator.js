import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import WorkoutScreen from '../screens/Workout/WorkoutScreen';
import TrainersScreen from '../screens/Trainers/TrainersScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-variant';
        else if (route.name === 'Workouts') iconName = 'dumbbell';
        else if (route.name === 'Trainers') iconName = 'account-group';
        else if (route.name === 'Profile') iconName = 'account-circle';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.tabInactive,
      headerShown: false,
      tabBarStyle: { backgroundColor: colors.background, borderTopWidth: 0 },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Workouts" component={WorkoutScreen} />
    <Tab.Screen name="Trainers" component={TrainersScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
