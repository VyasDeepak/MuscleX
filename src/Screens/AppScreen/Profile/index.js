import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, fonts } from "../../../theme/Colors";
import { imagespath } from "../../../theme/imagespath";
import AppHeader from "../../../navigation/navBar";
import { useUserStore } from "../../../zustand/userStore";
import AuthService from "../../../api/services/auth";

const { width } = Dimensions.get("window");
const postSize = (width - 32 - 16) / 2; // 16 = gap between columns

// Dummy posts data
const dummyPosts = [
  { id: "1", uri: imagespath?.good_mor },
  { id: "2", uri: imagespath?.good_mor },
  { id: "3", uri: imagespath?.good_mor },
  { id: "4", uri: imagespath?.good_mor },
  { id: "5", uri: imagespath?.good_mor },
  { id: "6", uri: imagespath?.good_mor },
  { id: "7", uri: imagespath?.good_mor },
  { id: "8", uri: imagespath?.good_mor },
];

const Profile = (props) => {
  const { user, setUser, loading } = useUserStore();
  const [posts, setPosts] = useState(dummyPosts);

  useEffect(() => {
    AppHeader({
      ...props,
      leftClick: () => {
        props?.navigation?.goBack();
      },
      LeftIcon: true,
      leftImage: imagespath.back_arrow,
      Title: "Profile",
    });
  }, []);

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await AuthService.getUser();
      if (response?.id) {
        setUser(response);
      }
    } catch (err) {
      Alert.alert("Profile Error", err?.message || "Failed to fetch profile");
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={item.uri} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image with + Button */}
          <View style={styles.profileImageContainer}>
            <Image
              source={imagespath?.profile_icon}
              style={styles.profileImage}
            />
            {/* <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity> */}
          </View>

          {/* User Name */}
          <Text style={styles.userName}>{user?.name || "User"}</Text>

          {/* Phone Number */}
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneNumber}>{user?.phoneNumber || "N/A"}</Text>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props?.navigation?.navigate("EditProfile")}
            style={styles.editButton}>
            <Image source={imagespath.edit_icon} style={styles.editIcon} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <Text style={styles.postsTitle}>Post ({posts.length})</Text>
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.postsRow}
            contentContainerStyle={styles.postsGrid}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  contentContainer: {
    paddingBottom: 100,
    marginTop: "15%",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#0570E1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: fonts.font_size_16,
    fontFamily: fonts.robot_bold,
  },
  userName: {
    fontSize: fonts.font_size_16,
    fontFamily: fonts.robot_semi_bold,
    color: "#FF1493",
    marginBottom: 12,
  },
  phoneContainer: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#0570E1",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  editIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    tintColor: Colors.white,
  },
  editButtonText: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_medium,
    color: Colors.white,
  },
  postsSection: {
    paddingHorizontal: 16,
  },
  postsTitle: {
    fontSize: fonts.font_size_16,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
    marginBottom: 12,
  },
  postsGrid: {
    paddingBottom: 20,
  },
  postsRow: {
    gap: 16,
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  postItem: {
    width: postSize,
    height: postSize,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.light_gray,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    fontSize: fonts.font_size_18,
    color: "#FF1493",
    fontFamily: fonts.robot_bold,
  },
});
