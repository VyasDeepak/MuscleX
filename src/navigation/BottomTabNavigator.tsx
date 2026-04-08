import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../src/Screens/Home';
import WorkoutsScreen from '../Screens/Workouts/Workouts';
import ProfileScreen from '../Screens/Profile/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Workouts') iconName = 'dumbbell';
          else if (route.name === 'Analytics') iconName = 'chart-line';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#b5f23a', // Lime green (FITFLOW)
        tabBarInactiveTintColor: '#888',   // Muted grey
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161616',     // Very dark tab bar
          borderTopColor: '#2e2e2e',      // Dark border
          borderTopWidth: 1,
          height: 56,
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Analytics" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default BottomTabNavigator;
