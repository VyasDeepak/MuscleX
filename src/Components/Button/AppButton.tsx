import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton;
