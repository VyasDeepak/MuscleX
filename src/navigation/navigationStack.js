import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './appStack';
import { useUserStore } from '../zustand/userStore';
import { AuthStack } from './auth';
import SplashScreen from 'react-native-splash-screen';


// Routes component
 const Routes = () => {
  const { isLoggedIn } = useUserStore();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen?.hide();
    }, 2500);
  }, []);

  return (
    <NavigationContainer
      ref={nav => {
        global.navRef = nav;
      }}
    >
      <AuthStack />
    </NavigationContainer>
  );
};


export default Routes;