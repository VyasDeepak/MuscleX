import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => (
  <ImageBackground
    source={require('../../assets/images/onboarding.jpg')}
    style={styles.bg}
    resizeMode="cover"
  >
    <View style={styles.overlay} />
    <View style={styles.content}>
      <Text style={styles.title}>Workout From Home</Text>
      <Text style={styles.subtitle}>Build your fitness just from home without going outside</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Home')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default OnboardingScreen;
