import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";

import Video from "react-native-video";
import ViewShot from "react-native-view-shot";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Share from "react-native-share";
import { imagespath } from "../../../theme/imagespath";
import { Colors, fonts } from "../../../theme/Colors";
import ReactNativeBlobUtil from "react-native-blob-util";
import HomeServices from "../../../api/services/home";
import styles from "./styles";

const HomeScreen = (props) => {
  const [selected, setSelected] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const viewShotRefs = useRef({});
  const categories = [
    { label: "All", value: "all" },
    { label: "News", value: "news" },
    { label: "Learn", value: "learn" },
    { label: "Sanatan", value: "sanatan" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Motivational", value: "motivational" },
  ];
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const first = viewableItems[0].item;
      setCurrentPlayingId(first.id);
    }
  }).current;


  const hasAndroidPermission = async () => {
    if (Platform.OS !== "android") return true;

    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(([hasImages, hasVideo]) => hasImages && hasVideo);
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) return true;

    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  };

  const fetchListData = async (pageToFetch = 1, append = false) => {
    setIsLoadingPosts(true);
    try {
      const response = await HomeServices.getPosts({
        limit: 20,
        page: pageToFetch,
      });

      if (response?.status === 200) {
        const rawPosts = response?.data?.data || [];

        if (append) {
          setPostsData((prev) => [...prev, ...rawPosts]);
        } else {
          setPostsData(rawPosts);
        }

        setHasMore(response?.data?.pagination?.hasMore || false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchListData(1, false);
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingPosts && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchListData(nextPage, true);
    }
  };

  const captureCard = async (id) => {
    const ref = viewShotRefs.current[id];
    if (!ref) return null;
    try {
      return await ref.capture();
    } catch (e) {
      console.log("Card capture error", e);
      return null;
    }
  };

  const handleCardDownload = async (item) => {
    try {
      const hasPermission = await hasAndroidPermission();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Please grant storage permissions");
        return;
      }

      const uri = await captureCard(item.id);
      if (!uri) {
        Alert.alert("Error", "Failed to capture screenshot");
        return;
      }
      // Save to CameraRoll (Assuming saveScreenshot uses CameraRoll.save internally)
      await CameraRoll.save(uri, { type: "photo", album: "Adpik" });
      Alert.alert("Success", "Photo saved to gallery 🎉");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const downloadAndSaveVideo = async (videoUrl) => {
    try {
      const { config, fs } = ReactNativeBlobUtil;
      const date = new Date();
      // Create a unique filename
      const fileName = `Adpik_Video_${Math.floor(date.getTime())}.mp4`;

      // On Android, we download to the Public Download folder first
      // so the System Download Manager can track it.
      const downloadDest = `${fs.dirs.DownloadDir}/${fileName}`;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // Use the native Android Download Manager
          notification: true, // Show progress in notification bar
          title: fileName, // Title in notification
          description: "Downloading video...",
          mime: "video/mp4",
          mediaScannable: true, // Makes it show up in Gallery immediately
          path: downloadDest,
        },
      };

      // 1. Start Download
      const res = await config(options).fetch("GET", videoUrl);

      // 2. Save to CameraRoll (Gallery)
      // res.path() gives the local path of the downloaded file
      const filePath = res.path();

      if (Platform.OS === "ios") {
        // iOS requires saving specifically to CameraRoll
        await CameraRoll.save(filePath, { type: "video", album: "Adpik" });
      } else {
        // Android: Since mediaScannable is true and we saved to DownloadDir,
        // it usually appears in the gallery automatically.
        // But for consistency, we call save:
        await CameraRoll.save(filePath, { type: "video", album: "Adpik" });
      }

      return { success: true, path: filePath };
    } catch (error) {
      console.error("Download Error:", error);
      return { success: false, error: error.message };
    }
  };

  const handleVideoDownload = async (item) => {
    try {
      // 1. Check Permissions (Android 13+ needs READ_MEDIA_VIDEO)
      const hasPermission = await hasAndroidPermission();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Please grant storage permissions");
        return;
      }

      if (!item.videoUri) {
        Alert.alert("Error", "No video URL available");
        return;
      }

      // Optional: Show a loading indicator here
      console.log("Starting download...");

      // 2. Call the helper we created above
      const result = await downloadAndSaveVideo(item.videoUri);

      if (result.success) {
        Alert.alert("Success", "Video saved to gallery! 🎥");
      } else {
        Alert.alert("Error", result.error || "Failed to download video");
      }
    } catch (error) {
      console.error("Video download error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleCardShare = async (item) => {
    try {
      const uri = await captureCard(item.id);
      if (!uri) return;
      await Share.shareSingle({
        url: uri,
        type: "image/jpeg",
        social: Share.Social.WHATSAPP,
        message: `Check out this post!`,
      });
    } catch (e) {
      if (e && e.message !== "User did not share") {
        console.log("Card share error", e);
      }
    }
  };

  // share the video to WhatsApp
  const handleVideoShare = async (videoUrl) => {
    try {
      await Share.shareSingle({
        url: videoUrl, // CRITICAL: WhatsApp needs the local file
        type: "video/mp4",
        social: Share.Social.WHATSAPP,
      });
    } catch (e) {
      if (e && e.message !== "User did not share") {
        console.log("Video share error", e);
      }
    }
  };

  const renderCard = ({ item }) => {
    const isVideo = item.postType === "VIDEO";
    const isPlaying = isVideo && item.id === currentPlayingId;

    // Helper to get user info (from overlay fields or fallback)
    const userName =
      item.overlayName || item.userName || item.user?.name || "Anonymous";

    const mobileNumber =
      item.overlayPhone || item.mobileNumber || item.user?.mobileNumber || "";
    const avatar = item.overlayProfileImageUrl
      ? { uri: item.overlayProfileImageUrl }
      : item.avatar || imagespath.app_log;

    const renderWithMedia = (children) => {
      const media = (item.media && item.media[0]) || [];
      const cardImageStyle = [
        styles.cardImage,
        { minHeight: 320, maxHeight: 420 },
      ];
      if (isVideo && media.mediaType === "VIDEO") {
        return (
          <View style={cardImageStyle}>
            <Video
              source={{ uri: media.url }}
              style={cardImageStyle}
              resizeMode="cover"
              repeat
              paused={!isPlaying}
              muted={false}
            />
            {children}
          </View>
        );
      }
      return (
        <ImageBackground
          source={{ uri: media.url }}
          style={cardImageStyle}
          imageStyle={styles.cardImageInner}
          resizeMode="cover"
        >
          {children}
        </ImageBackground>
      );
    };

    const resolvedFrame = [1, 2, 3].includes(Number(item?.media[0]?.frame))
      ? Number(item?.media[0]?.frame)
      : 1;

    const renderFrame1 = () => (
      <>
        {renderWithMedia()}
        <Image
          source={avatar}
          style={{
            position: "absolute",
            zIndex: 99,
          }}
          resizeMode="cover"
        />
        <View
          style={[
            styles.postBottomStrip,
            styles.postBottomStripPink,
            {
              flexDirection: "row",
              backgroundColor: "rgba(255,255,255,0.96)",
              borderTopWidth: 2,
              borderTopColor: "#FF2D81",
              paddingVertical: 10,
            },
          ]}
        >
          <View
            style={[styles.postBottomTextArea, { paddingRight: 100, flex: 1 }]}
          >
            <Text
              style={[styles.postBottomName, styles.postBottomNamePink]}
              numberOfLines={1}
            >
              {userName}
            </Text>

            <Text style={styles.postBottomMobile}>
              {mobileNumber || "6377728252"}
            </Text>
          </View>
        </View>
      </>
    );

    const renderFrame2 = () => (
      <>
        {renderWithMedia()}
        <View style={[styles.variant2BottomRow, { bottom: 18 }]}>
          <View
            style={[
              styles.variant2TextCard,
              {
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 18,
                backgroundColor: "rgba(255,255,255,0.96)",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderWidth: 2,
                borderColor: "#2B7BD3",
              },
            ]}
          >
            <Image
              source={avatar}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 2,
                borderColor: "#2B7BD3",
                marginRight: 12,
              }}
              resizeMode="cover"
            />
            <View style={[styles.variant2TextArea, { flex: 1 }]}>
              <Text
                style={[styles.postBottomName, styles.postBottomNameBlue]}
                numberOfLines={1}
              >
                {userName}
              </Text>

              {/* {!!mobileNumber && ( */}
              <Text style={styles.variant2Mobile}>
                {mobileNumber || "6377728252"}
              </Text>
              {/* )} */}
            </View>
          </View>
        </View>
      </>
    );

    const renderFrame3 = () => (
      <>
        {renderWithMedia()}
        <View
          style={[
            styles.postBottomStrip,
            styles.postBottomStripPurple,
            styles.variant3Strip,
            {
              flexDirection: "row",
              backgroundColor: "rgba(255,245,255,0.98)",
              borderTopWidth: 0,
              borderColor: "#3F1E7A",
              paddingVertical: 10,
              paddingHorizontal: 16,
              elevation: 3,
            },
          ]}
        >
          <Image
            source={avatar}
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              borderWidth: 2,
              borderColor: "#fff",
              marginRight: 12,
            }}
            resizeMode="cover"
          />
          <View style={styles.variant3StripText}>
            <Text
              style={[
                styles.postBottomName,
                styles.postBottomNamePurple,
                { color: "#3F1E7A" },
              ]}
              numberOfLines={1}
            >
              {userName}
            </Text>

            {/* {!!mobileNumber && ( */}
            <Text style={styles.variant3StripMobile}>
              {mobileNumber || "6377728252"}
            </Text>
            {/* )} */}
          </View>
        </View>
      </>
    );

    return (
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <Image
            source={avatar}
            style={styles.profileAvatar}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
          </View>
        </View>

        {/* Background image / video + different frame layout per card, wrapped in ViewShot */}
        <ViewShot
          ref={(ref) => {
            if (ref) {
              viewShotRefs.current[item.id] = ref;
            }
          }}
          options={{ format: "jpg", quality: 0.9 }}
          style={styles.frameContainer}
        >
          {resolvedFrame === 1 && renderFrame1()}
          {resolvedFrame === 2 && renderFrame2()}
          {resolvedFrame === 3 && renderFrame3()}
        </ViewShot>
        {/* do not change this */}
        <View style={styles.cardBody}>
          <View style={styles.actionRow}>
            <View style={styles.metric}>
              <View style={styles.metricContent}>
                <Image
                  source={imagespath.like_icon}
                  style={styles.metricIcon}
                  resizeMode="contain"
                />
                <Text style={styles.metricCount}>{item.likes}</Text>
              </View>
            </View>
            <View style={styles.metric}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCardId(item.id);
                  setModalVisible(true);
                }}
                style={styles.metricContent}
              >
                <Image
                  source={imagespath.comment_icon}
                  style={styles.metricIcon}
                  resizeMode="contain"
                />
                <Text style={styles.metricCount}>{item.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.pill, { backgroundColor: "#25D366" }]}
              onPress={() =>
                isVideo
                  ? handleVideoShare(item.media[0]?.url)
                  : handleCardShare(item)
              }
            >
              <Image
                source={imagespath.whatsapp_icon}
                style={styles.pillIcon}
                resizeMode="contain"
              />
              <Text style={styles.pillText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pill, { backgroundColor: "#2B7BD3" }]}
              onPress={() => {
                isVideo ? handleVideoDownload(item) : handleCardDownload(item);
              }}
            >
              <Image
                source={imagespath.download_icon}
                style={[styles.pillIcon, { marginRight: 2 }]}
                resizeMode="contain"
              />
              <Text style={styles.pillText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pill, { backgroundColor: "#095AB2" }]}
              activeOpacity={0.6}
              onPress={() => props?.navigation?.navigate("EditProfile")}
            >
              <Image
                source={imagespath.edit_icon}
                style={styles.pillIcon}
                resizeMode="contain"
              />
              <Text style={styles.pillText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imagespath.Adpik}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          {/* <TouchableOpacity style={styles.iconPlaceholder} /> */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("EditProfile")}
            style={styles.avatarPlaceholder}
          >
            <Image
              source={imagespath.profile_icon}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesWrap}>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item.value)}
              style={[
                styles.chip,
                selected === item.value
                  ? styles.chipSelected
                  : styles.chipUnselected,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selected === item.value ? styles.chipTextSelected : {},
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}> */}

      <FlatList
        data={postsData}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              minHeight: 300,
              paddingVertical: 40,
            }}
          >
            <Image
              source={imagespath.app_log}
              style={{ height: 130, width: 130, marginBottom: 18 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.robot_semi_bold,
                marginTop: 8,
                color: Colors.black,
                textAlign: "center",
              }}
            >
              No Post Shared yet
            </Text>
          </View>
        }
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 13 }}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingPosts && hasMore ? (
            <View style={{ padding: 16, alignItems: "center" }}>
              <Text style={{ color: Colors.gray, fontSize: 14 }}>
                Loading more...
              </Text>
            </View>
          ) : null
        }
      />

      {/* <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={imagespath.close_icon}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={
                cardsData.find((card) => card.id === selectedCardId)
                  ?.commentsList || []
              }
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Image
                    source={item.avatar}
                    style={styles.commentAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.commentBody}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentName}>{item.name}</Text>
                      <Text style={styles.commentDate}>{item.date}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              style={styles.commentsList}
            />

            <View style={styles.commentInputContainer}>
              <TextInput
                placeholder="Add a comment"
                style={styles.commentInput}
                placeholderTextColor="#999"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeScreen;
