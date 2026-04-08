import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  Image,
  PermissionsAndroid,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import * as Helper from '../utils/helper';
import { alert, permissionConfirm } from '../utils/alertController';
import { imagespath } from '../theme/imagespath';
import { fonts } from '../theme/Colors';

const { width, height } = Dimensions.get('window');

const ImageController = props => {
  const { onSuccess, isCroping, ismultiple, openDesignSelection } =
    props.route?.params || {};

  let messages = {
    IMAGE_PROCESSING: 'Processing...',
    FILE_ERROR: 'File not found',
    GALLERY_PERMISSION: 'Please allow gallery permission',
  };

  const getPermissionType = mediaType => {
    if (Platform.OS === 'ios') {
      return PERMISSIONS.IOS.PHOTO_LIBRARY;
    }

    // Android 13+ uses separate media permissions
    if (Platform.Version >= 33) {
      return mediaType === 'video'
        ? PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    }

    // Older Android: fall back to external storage
    return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  };

  const checkAndroidBasePermission = async () => {
    if (Platform.OS !== 'android') {
      return 'granted';
    }

    // On Android 13+ the runtime dialog will come from react-native-permissions
    if (Platform.Version >= 33) {
      return 'granted';
    }

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted' &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        'granted'
    ) {
      return 'granted';
    }

    return 'denied';
  };

  const checkPermission = async mediaType => {
    Helper.appIsBackground = true;

    const permissionType = getPermissionType(mediaType);

    try {
      // First do Android base permission check (same style as your working code)
      const baseStatus = await checkAndroidBasePermission();

      if (baseStatus === 'granted') {
        const currentStatus = await check(permissionType);

        if (currentStatus === 'granted' || currentStatus === 'limited') {
          if (mediaType === 'gallery') openGalleryView();
          if (mediaType === 'video') openGalleryVideo();
          return;
        }

        if (currentStatus === 'blocked') {
          permissionConfirm(messages.GALLERY_PERMISSION, confirm => {
            if (confirm) {
              openSettings().catch(() =>
                console.warn('Cannot open settings'),
              );
            }
          });
          return;
        }

        const status = await request(permissionType);

        if (status === 'granted' || status === 'limited') {
          if (mediaType === 'gallery') openGalleryView();
          if (mediaType === 'video') openGalleryVideo();
        } else if (status === 'blocked') {
          permissionConfirm(messages.GALLERY_PERMISSION, confirm => {
            if (confirm) {
              openSettings().catch(() =>
                console.warn('Cannot open settings'),
              );
            }
          });
        }
      } else {
        permissionConfirm(messages.GALLERY_PERMISSION, confirm => {
          if (confirm) {
            openSettings().catch(() =>
              console.warn('Cannot open settings'),
            );
          }
        });
      }
    } catch (e) {
      console.warn('Permission check error', e);
    } finally {
      setTimeout(() => {
        Helper.appIsBackground = false;
      }, 1000);
    }
  };

  const onComplete = res => {
    onSuccess && onSuccess(res);

    setTimeout(() => {
      Helper.appIsBackground = false;
    }, 1000);

    // Close this modal first
    props.navigation.goBack(null);

    // If called from CreatePost, open the 3-design selection screen explicitly
    if (openDesignSelection && global.navRef?.navigate) {
      setTimeout(() => {
        try {
          global.navRef.navigate('BottomTab', {
            screen: 'CreatePostBottom',
            params: {
              screen: 'DesignSelection',
              params: { media: res },
            },
          });
        } catch (e) {
          console.warn('Navigation to DesignSelection failed', e);
        }
      }, 100);
    }
  };

  const openGalleryView = async () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.6,
      cropping: isCroping || false,
      loadingLabelText: messages.IMAGE_PROCESSING,
      multiple: ismultiple || false,
    })
      .then(response => {
        onComplete(response);
      })
      .catch(e => {
        if (e.message === 'Cannot find image data') {
          alert(messages.FILE_ERROR);
        }
      });
  };

  const openGalleryVideo = async () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    })
      .then(response => {
        onComplete(response);
      })
      .catch(e => {
        if (e.message === 'Cannot find image data') {
          alert(messages.FILE_ERROR);
        }
      });
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose Media</Text>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.closeButton}
            >
            <Image source={imagespath.close_icon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {/* Gallery Option */}
            <TouchableOpacity
              onPress={() => checkPermission('gallery')}
              style={styles.optionButton}
            >
              <View style={styles.iconContainer}>
              <Image source={imagespath.gellary_pop} style={styles.gellaryIcon} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>Gallery</Text>
                <Text style={styles.optionSubtitle}>
                  Choose from library
                </Text>
              </View>
              <Image source={imagespath.arrow_right} style={styles.arrowRightIcon} />
            </TouchableOpacity>

            {/* Video Option */}
            <TouchableOpacity
              onPress={() => checkPermission('video')}
              style={styles.optionButton}
            >
              <View style={styles.iconContainer}>
              <Image source={imagespath.video_pop} style={styles.videoIcon} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>Video</Text>
                <Text style={styles.optionSubtitle}>
                  Select a video
                </Text>
              </View>
              <Image source={imagespath.arrow_right} style={styles.arrowRightIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageController;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: fonts.SIZE_18,
    fontFamily: fonts.robot_semi_bold,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    paddingVertical: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F8F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fonts.SIZE_16,
    fontFamily: fonts.robot_semi_bold,
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: fonts.SIZE_12,
    fontFamily: fonts.robot_semi_bold,
    color: '#666',
  },
  gellaryIcon: {
    width: 24,
    height: 24,
  },
  videoIcon: {
    width: 24,
    height: 24,
  },
  arrowRightIcon: {
    width: 24,
    height: 24,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});