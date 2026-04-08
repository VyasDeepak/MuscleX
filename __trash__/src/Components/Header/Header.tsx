import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface HeaderProps {
  title: string;
  right?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, right }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

export default Header;
