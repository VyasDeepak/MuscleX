import { PermissionsAndroid, Platform, Alert } from 'react-native';

/**
 * Request camera roll / media library permissions
 * @returns {Promise<boolean>} True if permission granted, false otherwise
 */
export const requestCameraRollPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      // iOS: CameraRoll handles permissions automatically via Info.plist
      return true;
    }

    // Android: Request READ_EXTERNAL_STORAGE (for accessing gallery)
    if (Platform.Version >= 30) {
      // Android 11+: Use READ_MEDIA_IMAGES and READ_MEDIA_VIDEO
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      return (
        result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === 'granted' &&
        result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === 'granted'
      );
    } else {
      // Android 10 and below
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Media Access',
          message: 'App needs access to your photos and videos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return result === 'granted';
    }
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

/**
 * Request write to external storage permission (for saving files)
 * @returns {Promise<boolean>} True if permission granted, false otherwise
 */
export const requestWriteStoragePermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true; // iOS handles via Info.plist
    }

    if (Platform.Version >= 30) {
      // Android 11+: Uses scoped storage, no explicit permission needed for app-specific dirs
      return true;
    } else {
      // Android 10 and below
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'App needs access to save files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return result === 'granted';
    }
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

/**
 * Check if all required media permissions are granted
 * @returns {Promise<boolean>}
 */
export const checkMediaPermissions = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    if (Platform.Version >= 30) {
      const result = await PermissionsAndroid.checkMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      return (
        result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === 'granted' &&
        result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === 'granted'
      );
    } else {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return result;
    }
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};

/**
 * Request all required permissions
 * @returns {Promise<boolean>} True if all permissions granted
 */
export const requestAllPermissions = async () => {
  try {
    const readPermission = await requestCameraRollPermission();
    const writePermission = await requestWriteStoragePermission();
    return readPermission && writePermission;
  } catch (error) {
    console.error('Permission request error:', error);
    Alert.alert('Permission Error', 'Failed to request permissions');
    return false;
  }
};
