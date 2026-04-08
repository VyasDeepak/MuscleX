import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to MuscleX</Text>
    <Text style={styles.subtitle}>Your Fitness Journey Starts Here</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
});

export default Home;
