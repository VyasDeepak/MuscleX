import React, { useState, useRef, useLayoutEffect } from 'react';
import FrameOne from '../../../Components/Frames/FrameOne';
import FrameTwo from '../../../Components/Frames/FrameTwo';
import FrameThree from '../../../Components/Frames/FrameThree';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';
import { imagespath } from '../../../theme/imagespath';
import { useUserStore } from '../../../zustand/userStore';
import HomeServices from '../../../api/services/home';
const { width } = Dimensions.get('window');
import styles from './styles';
import { showToastMessage } from '../../../api/Toast';

const DesignSelectionScreen = props => {
  const { route, navigation } = props;
  const media = route?.params?.media || {};
  const { user } = useUserStore();
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const viewShotRef = useRef(null);

  const captureFramedImage = async () => {
    if (!viewShotRef.current) {
      return null;
    }
    try {
      const uri = await viewShotRef.current.capture();
      return uri;
    } catch (e) {
      console.log('Capture error', e);
      return null;
    }
  };



  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Choose your design',
    });
  }, []);

  const commonUser = {
    userName: 'Your Name',
    // HomeScreen ke first card jaise – yaha title text nahi dikhayenge
    tagline: 'Write your thought or message here.',
    mobileNumber: '+91 99999 99999',
    avatar: imagespath.app_log,
  };

  const TOTAL_DESIGNS = 3;

  const isVideo =
    (media?.mime && media.mime.startsWith('video')) ||
    typeof media?.duration === 'number' ||
    (typeof media?.path === 'string' &&
      /\.(mp4|mov|m4v|avi)$/i.test(media.path));

  const renderWithMedia = children => {
    if (isVideo && media?.path) {
      return (
        <View style={styles.cardImage}>
          <Video
            source={{ uri: media.path }}
            style={styles.cardImage}
            resizeMode="cover"
            repeat
            paused={false}
            muted={false}
          />
          {children}
        </View>
      );
    }

    return (
      <ImageBackground
        source={media?.path ? { uri: media.path } : imagespath.good_mor}
        style={styles.cardImage}
        imageStyle={styles.cardImageInner}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  };

  const goNextDesign = () => {
    setSelectedDesign(prev => (prev === TOTAL_DESIGNS ? 1 : prev + 1));
  };

  const goPrevDesign = () => {
    setSelectedDesign(prev => (prev === 1 ? TOTAL_DESIGNS : prev - 1));
  };


  // Helper values (avoid repeating)
  const fileName = media?.fileName || media?.path?.split('/').pop();
  const isImage = media?.mime?.includes('image');
  const mediaType = isImage ? 'IMAGE' : 'VIDEO';
  const { setLoading } = useUserStore();

  
  const handlePublishPost = async () => {
    if (!media?.path) {
      Alert.alert('Error', 'Media not found. Please go back and select again.');
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      // Step 1: Get presigned URL
      const { data: presignResponse } = await HomeServices.assignMediaToPost({
        fileName,
        mimeType: media.mime,
        mediaType,
      });

      const { success, data: mediaData, message } = presignResponse ?? {};
      const uploadUrl = mediaData?.uploadUrl;

      if (!success || !uploadUrl) {
        throw new Error(message || 'Failed to get upload URL');
      }

      // Step 2: Upload file
      const formData = new FormData();
      formData.append('file', {
        uri: media.path,
        name: fileName,
        type: media.mime,
      });

      const uploadResponse = await HomeServices.hitUploadComplete(
        uploadUrl,
        formData,
      );

      if (uploadResponse?.status !== 200) {
        throw new Error('Failed to upload media to server');
      }

      // Step 3: Create post
      const payload = buildPostPayload(mediaData);
      const response = await HomeServices.createPost(payload);

      if (response?.success || response?.status === 201 || response?.data?.id) {
        showToastMessage('Post created successfully!', 'success');
        navigation.reset({ index: 0, routes: [{ name: 'BottomTab' }] });
      } else {
        throw new Error(response?.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('[handlePublishPost]', error);
      Alert.alert(
        'Error',
        error?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // ✅ Pure helper — easily testable, no side effects
  const buildPostPayload = mediaData => ({
    postType: mediaType,
    caption: '',
    overlayName: user?.name ?? '',
    overlayAbout: '',
    overlayPhone: user?.mobileNumber ?? '',
    overlayProfileTempKey: '',
    overlayProfileImageUrl: user?.profileImage ?? '',
    overlayBannerTempKey: '',
    overlayBannerImageUrl: user?.bannerImage ?? '',
    location: '',
    tags: 'thought',
    allowComments: true,
    media: [
      {
        mediaType,
        url: mediaData?.fileUrl,
        thumbnailTempKey: '',
        thumbnailUrl: '',
        frame: selectedDesign,
        metadata: {},
        width: media?.width ?? 0,
        height: media?.height ?? 0,
        durationSec: media?.duration ?? 0,
        orderIndex: 0,
      },
    ],
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headingText}>
          Preview your thought and change the frame design.
        </Text>

        {/* Single preview card wrapped in ViewShot – switches design instead of 3 separate cards */}
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          {selectedDesign === 1 && (
            <FrameOne
              styles={styles}
              user={commonUser}
              renderWithMedia={renderWithMedia}
            />
          )}
          {selectedDesign === 2 && (
            <FrameTwo
              styles={styles}
              user={commonUser}
              renderWithMedia={renderWithMedia}
            />
          )}
          {selectedDesign === 3 && (
            <FrameThree
              styles={styles}
              user={commonUser}
              renderWithMedia={renderWithMedia}
            />
          )}
        </ViewShot>

        {/* Design change controls */}
        <View style={styles.designControls}>
          <TouchableOpacity
            style={styles.arrowButton}
            activeOpacity={0.7}
            onPress={goPrevDesign}
          >
            <Text style={styles.arrowText}>{'<'}</Text>
          </TouchableOpacity>

          <View style={styles.designCenter}>
            <View style={styles.dotsRow}>
              {[1, 2, 3].map(id => (
                <View
                  key={id}
                  style={[
                    styles.dot,
                    selectedDesign === id && styles.dotActive,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.designCounterText}>
              Design {selectedDesign} of {TOTAL_DESIGNS}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.arrowButton}
            activeOpacity={0.7}
            onPress={goNextDesign}
          >
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={styles.changeButton}
          activeOpacity={0.8}
          onPress={goNextDesign}>
          <Text style={styles.changeButtonLabel}>Change design</Text>
        </TouchableOpacity> */}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.selectedLabel}>
          Selected design: {selectedDesign}
        </Text>
        <TouchableOpacity
          style={[styles.createPostButton]}
          onPress={handlePublishPost}
          disabled={isSubmitting}
        >
          <Text style={styles.createPostButtonText}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.buttonContainer}> */}
        {/* <TouchableOpacity
              style={[styles.confirmButton, styles.actionButton]}
              onPress={handleShare}>
              <Text style={styles.confirmButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, styles.actionButton]}
              onPress={handleDownload}>
              <Text style={styles.confirmButtonText}>Download</Text>
            </TouchableOpacity> */}

        {/* </View> */}
      </View>
    </View>
  );
};

export default DesignSelectionScreen;
