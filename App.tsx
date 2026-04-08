import React, { useEffect } from 'react';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import splashScreen from 'react-native-splash-screen';
const App = () => {

  useEffect(() => {
    // Simulate loading or authentication check
    const timer = setTimeout(() => {
      splashScreen.hide();
      // You can add any initialization logic here
    }, 0);
    return () => clearTimeout(timer);
  }
  , []);

  return <BottomTabNavigator />;
};

export default App;
