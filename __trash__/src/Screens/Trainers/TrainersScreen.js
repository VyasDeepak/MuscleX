import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const TrainersScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Trainers Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  text: { color: colors.text, fontSize: 22, fontWeight: 'bold' },
});

export default TrainersScreen;
