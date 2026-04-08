import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from '@react-navigation/native';

const Splash = (props) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //         SplashScreen.hide();
  //         // For doctor, navigate to DoctorBottomTab
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'Login' }],
  //         });
  //   }, 3000)
  // }, [])
  
  
  return (
    <></>
  )
}

export default Splash