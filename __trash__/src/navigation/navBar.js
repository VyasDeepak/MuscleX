import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { imagespath } from '../theme/imagespath';
import { fonts,Colors } from '../theme/Colors';

const AppHeader = props => {
  return props.navigation.setOptions({
    headerLeft: () => (
      <View style={styles.view_header}>
        {props.LeftIcon ? (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              hitSlop={{top: 20, left: 15, right: 20, bottom: 20}}
              onPress={() => props.leftClick()}>
              <Image
                resizeMode={'contain'}
                source={props?.leftImage}
                style={props?.backStyles ? props?.backStyles : styles.backImg}
              />
            </TouchableOpacity>
            <Text
            style={[
              styles.text_title,
              {color: props?.color ? props?.color : 'black'},
            ]}>
            {props.Title_header}
          </Text>

          </>
        ) : null}
      </View>
    ),

    headerTitle: () => (
      <View style={{}}>
        {props.Title ? (
          <Text
            style={[
              styles.text_title,
              {color: props?.color ? props?.color : 'black'},
            ]}>
            {props.Title}
          </Text>
        ) : null}
      </View>
    ),




    headerRight: () => (
  <>
        {props?.LOGO ? (
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => props.onRightClick()}
              style={[styles.view_logOut, {marginRight: 20}]}>
              <Image
                resizeMode={'contain'}
                source={props?.right_icon}
                style={styles.imglogo}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        </>
    ),

    headerStyle: {
      height: 60,
      // backgroundColor: 'white',
    },
    headerLayoutPreset: 'center',
  });
};

export default AppHeader;

const styles = StyleSheet.create({
  view_header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  text_title: {
    alignSelf: "center",
    fontFamily: fonts.robot_semi_bold,
    fontSize: fonts.font_size_14,
    marginLeft: 30,
    textAlign :'center'

  },

  view_inbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImg: {
    height: 24,
    width: 24,
    alignSelf: 'center',
    marginRight: 10,
  },
  view_logOut: {alignItems: 'center', justifyContent: 'center'},
  imglogo :{
    height: 24,
    width: 24,

  }
});
