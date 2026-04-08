import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Colors, fonts } from '../theme/Colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const AppHeader = props => {
  return props.navigation.setOptions({

    headerLeft: () => (
      <View style={styles.view_header}>
        {props.LeftIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.leftClick()}
          >
            <Image
              resizeMode={'contain'}
              source={props?.leftImage}
              style={props?.backStyles ? props?.backStyles : styles.backImg}
            />


          </TouchableOpacity>
        ) : null}
      </View>
    ),

    headerTitle: () => (
      <View>
        {props.Title ? (
          <Text
            style={[
              styles.text_title,
              { color: props?.color ? props?.color : Colors.BLACK },
            ]}
          >
            {props.Title}
          </Text>
        ) : null}

        {props.Titleimg ? (
          <Image
            resizeMode={'contain'}
            source={props?.Titleimg}
            style={{
              width: Platform.OS === 'ios' ? windowWidth * 0.12 : windowWidth * 0.13,
              height: Platform.OS === 'ios' ? windowHeight * 0.12 : windowHeight * 0.13,
              alignSelf: "center",
              marginLeft: Platform.OS === 'ios' ? '57%' : '53%'
            }}
          />
        ) : null}
      </View>
    ),

    headerRight: () => (
      <View style={styles.view_right}>
        {props?.badge ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.view_logOut}
          >
            {/* <Image
              resizeMode={'contain'}
              source={props?.rightImg}
              style={props?.RightStyle ? props?.RightStyle : styles.imgRight}
            />
            <Text
              style={[
                styles.text_right,
                { color: props?.colorRigtText ? props?.colorRigtText : Colors.WHITE },
              ]}
              >
              {props.right_text}
            </Text> */}
           
          </TouchableOpacity>
        ) : null}
        {props?.rightImgOne ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.onRightOneClick()}
            style={[styles.view_logOut, { marginHorizontal: 15 }]}>
            <Image
              resizeMode={'contain'}
              source={props?.rightImgOne}
              style={
                props?.RightOneStyle ? props?.RightOneStyle : styles.imgRight
              }
            />
            
            <View style={styles.cart_count}>
              <Text style={styles.cart_text}>{props?.countcart}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {/* Security Guard Badge */}
   
      </View>
    ),

    headerStyle: {
      height: Platform.OS === 'ios' ? windowHeight * 0.07 : windowHeight * 0.07,
      backgroundColor: '#FFF',
    //   borderBottomWidth: 1,
    //   borderBottomColor: '#EEEEEE'
    },
    headerLayoutPreset: 'center',
  });
};

export default AppHeader;

const styles = StyleSheet.create({
  view_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  text_title: {
    fontFamily: fonts.robot_bold,
    fontSize: fonts.font_size_16,
    marginLeft: 15
  },

  imgRight: {
    width: 30,
    height: 30,
  },

  backImg: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.05,
    alignSelf: 'center',
  },
  text_right: {
    color: Colors.WHITE,
    fontFamily: fonts.robot_regular,
    fontSize: fonts.SIZE_9,
  },
  view_right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  view_logOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cart_count: {
    width: 18,
    height: 18,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 18,
    position: 'absolute',
    right: -10,
    top: 0
  },
  cart_text: {
    color: Colors.WHITE,
    fontFamily: fonts.robot_semi_bold,
    fontSize: fonts.SIZE_10,

  },

});
