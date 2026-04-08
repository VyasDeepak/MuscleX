import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../../theme/colors';

const { height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const dotRef = useRef(0);
  const [currentPage, setCurrentPage] = useState(0);

  const slides = [
    {
      title: 'Workout From Home',
      subtitle: 'Build your fitness just from home without going outside',
      image: require('../../assets/images/onboarding.jpg'),
    },
  ];

  return (
    <ImageBackground
      source={slides[currentPage].image}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{slides[currentPage].title}</Text>
        <Text style={styles.subtitle}>{slides[currentPage].subtitle}</Text>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
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
    textAlign: 'center',
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryText,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginBottom: 16,
    width: '100%',
    maxWidth: 280,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  skipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OnboardingScreen;
