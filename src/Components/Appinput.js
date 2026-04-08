import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Colors, fonts } from '../theme/Colors';

export const Appinput = props => {
  return (
    <View
      style={[
        styles.inputContainer,
        { marginBottom: props?.marginBottom ? props?.marginBottom : 16 },
      ]}
    >
      <Text style={styles.label}>{props?.label}</Text>
      <TextInput
        placeholder={props?.placeholder}
        placeholderTextColor={'#cecdcdff'}
        style={styles.input}
        keyboardType={props?.keyboardType ? props?.keyboardType : 'default'}
        secureTextEntry={
          props?.secureTextEntry ? props?.secureTExtEtnry : false
        }
        value={props?.value}
        onChangeText={props?.onChangeText}
      />
      {props.ISerror ? (
        <Text style={styles.error_text}>{props.ISerror}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 48,
    marginTop: 8,
    color: '#000',
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_regular,
  },
  label: {
    color: '#000',
    fontSize: fonts.font_size_14,
    fontWeight: '500',
    fontFamily: fonts.robot_medium,
  },
  error_text: {
    color: Colors?.RED,
    marginTop: 4,
    fontSize: fonts.font_size_12,
    fontFamily: fonts.robot_regular,
  },
});

export default Appinput;
