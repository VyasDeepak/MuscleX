import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { Colors, fonts } from '../../../theme/Colors';
import { imagespath } from '../../../theme/imagespath';
import { useUserStore } from '../../../zustand/userStore';

const Settings = (props) => {
  const { user, setUser, loading, setLoading, setError, logout } = useUserStore();

  const handleHelpSupport = () => {
    console.log('Help & Support pressed');
  };

  const handleAboutUs = () => {
    console.log('About Us pressed');
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            // Clear user store
            logout();
            
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const MenuItemRow = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIconContainer}>
          <Image source={icon} style={styles.menuIcon} resizeMode="contain" />
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Image source={imagespath.arrow_Grey} style={styles.menuArrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* User Info Section */}
        <View style={styles.userSection}>
          <Image
            source={imagespath?.profile_icon}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items Section */}
        <View style={styles.menuItemContainer}>
          <MenuItemRow
            icon={imagespath.info_help}
            label="Help & Support"
            onPress={handleHelpSupport}
          />
        </View>

        <View style={styles.menuItemContainer}>
          <MenuItemRow
            icon={imagespath.info}
            label="About Us"
            onPress={handleAboutUs}
          />
        </View>

        <View style={styles.menuItemContainer}>
          <MenuItemRow
            icon={imagespath.log_out}
            label="Logout"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fonts.font_size_15,
    fontFamily: fonts.robot_semi_bold,
    color: '#FF1493',
    marginBottom: 8,
  },
  phoneContainer: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  phoneNumber: {
    fontSize: fonts.font_size_11,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
  },
  divider: {
    height: 8,
    backgroundColor: Colors.BG_COLOR,
  },
  menuItemContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  menuLabel: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
  },
  menuArrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: Colors.gray,
    marginLeft: 12,
  },
});
