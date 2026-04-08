import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';

const OnboardingScreen = ({ navigation }) => (
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

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24,26,32,0.6)',
  },
  content: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default OnboardingScreen;
