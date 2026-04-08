import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const AppHeader = ({ title, right }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  right: {
    marginLeft: 12,
  },
});

export default AppHeader;
