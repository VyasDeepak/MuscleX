import { StatusBar, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoaderView from './src/api/loaderView';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/navigation/navigationStack';
const App = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F4F8' }}>
        <StatusBar
          translucent={false}
          backgroundColor="#F9F4F8"
          barStyle="dark-content"
        />
        <Routes />
      </SafeAreaView>
      <FlashMessage position="top" />
      <LoaderView />
    </>
  );
};

export default App;
