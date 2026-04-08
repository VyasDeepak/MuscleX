import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Workouts = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Workouts</Text>
    <Text style={styles.subtitle}>Browse and start your workout</Text>
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

export default Workouts;
