import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screens/Workouts/WorkoutsScreen';
import WorkoutsScreen from '../Screens/Workouts/WorkoutsScreen';
import AnalyticsScreen from '../Screens/Analytics/AnalyticsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Workouts: 'dumbbell',
            Analytics: 'chart-line',
            Profile: 'account',
          };
          return (
            <Icon
              name={icons[route.name] ?? 'circle'}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#b5f23a',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161616',
          borderTopColor: '#2e2e2e',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
