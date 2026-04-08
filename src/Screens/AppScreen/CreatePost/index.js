import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { imagespath } from "../../../theme/imagespath";
import { Colors, fonts } from "../../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import {showToastMessage} from "../../../api/Toast";

const { width } = Dimensions.get("window");
const imageSize = (width - 32 - 16) / 3; // 16 = 2 gaps * 8px each

// Dummy image data - replace with your actual image URLs
const dummyImages = [
  { id: "1", uri: imagespath?.good_mor },
  { id: "2", uri: imagespath?.good_mor },
  { id: "3", uri: imagespath?.good_mor },
];

const CreatePost = (props) => {
  const { navigate } = useNavigation();

  useLayoutEffect(() => {
    props?.navigation.setOptions({
      title: "Create your own thought",
    });
  }, [props?.navigation]);
  
  const [searchText, setSearchText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [media, setMedia] = useState(null);

  const handleUploadImage = () => {
    // Add image picker logic here
    console.log("Upload image tapped");
  };

  const chooseImage = () => {
    props.navigation.navigate("ImageController", {
      isCroping: true,
      openDesignSelection: false,
      onSuccess: (res) => {
        setMedia(res);
        console.log(res, "res");
      },
    });
  };
  const handleImageSelect = (image) => {
    setSelectedImage(image.id);
    console.log("Selected image:", image.id);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.imageItem,
        selectedImage === item.id && styles.selectedImage,
      ]}
      onPress={() => handleImageSelect(item)}
    >
      <Image source={item.uri} style={styles.imageThumb} />
    </TouchableOpacity>
  );

  const createPost = async () => {
    if (!media) {
      showToastMessage("Please upload or select a media file.");
      return;
    }
    if (!selectedImage) {
      showToastMessage("Please select a frame design.");
      return;
    }
    navigate("DesignSelection", { media, frame: selectedImage });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Upload Area */}
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={() => chooseImage()}
        >
          <View style={styles.uploadContent}>
            {media ? (
              media.mime && media.mime.startsWith("video") ? (
                <View style={{}}>
                  <Text
                    style={{
                      color: "#ff5aa5",
                      marginBottom: 8,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    Video selected
                  </Text>
                </View>
              ) : (
                <Image
                  source={{ uri: media.path }}
                  style={{
                    borderRadius: 12,
                    resizeMode: "cover",
                    height: "100%",
                    width: "100%",
                    zIndex: 99,
                  }}
                />
              )
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Image source={imagespath.gallary} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Upload your thought from</Text>
                <Text style={styles.uploadText}>your image gallery.</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Image Heading */}
        <Text style={styles.imageHeading}>Select Your Thought Frame</Text>

        {/* Image Grid */}
        <FlatList
          data={dummyImages}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContainer}
        />

        {/* Submit Button */}
      </ScrollView>
      <TouchableOpacity
        style={{
          marginTop: 24,
          backgroundColor: "#ff5aa5",
          borderRadius: 8,
          paddingVertical: 14,
          alignItems: "center",
          margin: 16,
        }}
        onPress={createPost}
   
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Create Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    marginTop: "14%",
  },
  uploadContainer: {
    borderWidth: 1.5,
    borderColor: "#ff5aa5",
    borderRadius: 20,
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width * 0.6,
    marginBottom: 20,
    backgroundColor: "#F7F4FD",
    overflow: "hidden",
  },
  uploadContent: {
    // alignItems: "center",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  uploadIcon: {
    width: 37,
    height: 37,
    marginBottom: 15,
    resizeMode: "contain",
    alignSelf: "center",
  },
  uploadText: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_semi_bold,
    color: "#ff5aa5",
    textAlign: "center",
  },
  imageHeading: {
    fontSize: fonts.font_size_15,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
    marginBottom: 16,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  gridRow: {
    flex: 1,
    marginBottom: 8,
    gap: 8,
  },
  imageItem: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.light_gray,
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  imageThumb: {
    width: "100%",
    height: imageSize,
  },
});
