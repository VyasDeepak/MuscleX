import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';



 const Appbutton = (props) => {
  return (
    <View style={[]}>
        <TouchableOpacity 
        onPress={props?.onPress}
        style={{
          justifyContent : 'center',
          alignItems : 'center',
            backgroundColor: props?.backgroundColor ? props?.backgroundColor : Colors?.BUTTON_COLOR,
            width : props?.width ? props?.width :  '90%',
            height : 48,
            bordderRadius : 8,
            alignSelf :'center',
            borderRadius : 6,
            marginTop: props?.marginTop ? props?.marginTop : 16,
            activeOpacity : 0.6,
        }}
        >
        <Text
        style={{
            color: props?.color ? props?.color : '#ffffff',
            fontSize : props?.fontSize ? props?.fontSize : 16,
            fontFamily : props?.fontFamily ? props?.fontFamily : 'Roboto-Medium'
            
        }}
        >{props?.title}</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Appbutton;