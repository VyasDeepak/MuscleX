import RNFS from "react-native-fs";
import CameraRoll from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";

/* ================= PERMISSION ================= */

export const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    if (Platform.Version >= 33) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);

      return (
        result["android.permission.READ_MEDIA_VIDEO"] === "granted" &&
        result["android.permission.READ_MEDIA_IMAGES"] === "granted"
      );
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch {
    return false;
  }
};

/* ================= HELPERS ================= */

const getFileName = (url, type = "video") => {
  try {
    let name = url?.split("/")?.pop()?.split("?")[0];

    if (!name || !name.includes(".")) {
      return `${type}_${Date.now()}.${type === "video" ? "mp4" : "jpg"}`;
    }

    return name;
  } catch {
    return `${type}_${Date.now()}.${type === "video" ? "mp4" : "jpg"}`;
  }
};

/**
 * Check file exists
 */
export const checkFileExists = async (filePath) => {
  try {
    const result = await RNFS.stat(filePath);
    return {
      exists: result.isFile() || result.isDirectory(),
      isDirectory: result.isDirectory(),
      size: result.size,
      timestamp: result.mtime,
    };
  } catch {
    return {
      exists: false,
      isDirectory: false,
      size: 0,
    };
  }
};

/**
 * Create directory
 */
export const createDirectoryIfNotExists = async (dirPath) => {
  try {
    const exists = await checkFileExists(dirPath);
    if (!exists.exists) {
      await RNFS.mkdir(dirPath);
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * App media folder
 */
export const getSaveDirectory = () => {
  return `${RNFS.DocumentDirectoryPath}/Adpik_Media`;
};

/* ================= DOWNLOAD VIDEO ================= */

export const downloadVideo = async (videoUrl, onProgress) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return { success: false, error: "Permission denied" };
    }

    const mediaDir = getSaveDirectory();
    await createDirectoryIfNotExists(mediaDir);

    const fileName = getFileName(videoUrl, "video");
    const path = `${mediaDir}/${fileName}`;

    const result = await RNFS.downloadFile({
      fromUrl: videoUrl,
      toFile: path,
      background: true,

      progress: (res) => {
        const percent = Math.floor(
          (res.bytesWritten / res.contentLength) * 100,
        );
        onProgress && onProgress(percent);
      },
    }).promise;

    if (result.statusCode === 200) {
      return { success: true, path };
    }

    return { success: false, error: "Download failed" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/* ================= SAVE VIDEO ================= */

export const saveVideoToCameraRoll = async (videoPath) => {
  try {
    const fileInfo = await checkFileExists(videoPath);
    if (!fileInfo.exists) {
      return { success: false, error: "File not found" };
    }

    try {
      const res = await CameraRoll.save(videoPath, { type: "video" });
      return { success: true, path: res };
    } catch {
      // fallback Android
      const fileName = videoPath.split("/").pop();
      return await copyToGalleryDirectory(videoPath, fileName);
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/* ================= SAVE IMAGE ================= */

export const saveImageToCameraRoll = async (imagePath) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      return { success: false, error: "Permission denied" };
    }

    const fileInfo = await checkFileExists(imagePath);
    if (!fileInfo.exists) {
      return { success: false, error: "Image not found" };
    }

    try {
      const res = await CameraRoll.save(imagePath, { type: "photo" });
      return { success: true, path: res };
    } catch {
      const mediaDir = getSaveDirectory();
      await createDirectoryIfNotExists(mediaDir);

      const fileName = `screenshot_${Date.now()}.jpg`;
      const dest = `${mediaDir}/${fileName}`;

      await RNFS.copyFile(imagePath, dest);

      return { success: true, path: dest };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/* ================= COPY TO GALLERY (ANDROID) ================= */

export const copyToGalleryDirectory = async (sourcePath, fileName) => {
  try {
    if (Platform.OS !== "android") {
      return { success: false, error: "Android only" };
    }

    const dcimPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera`;
    const destPath = `${dcimPath}/${fileName}`;

    try {
      await createDirectoryIfNotExists(dcimPath);
      await RNFS.copyFile(sourcePath, destPath);
      return { success: true, path: destPath };
    } catch {
      const picturePath = `${RNFS.PicturesDirectoryPath}/${fileName}`;
      await RNFS.copyFile(sourcePath, picturePath);
      return { success: true, path: picturePath };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/* ================= MAIN FUNCTIONS ================= */

/**
 * SERVER VIDEO → download + save
 */
export const downloadAndSaveVideo = async (videoUrl, onProgress) => {
  try {
    const downloadRes = await downloadVideo(videoUrl, onProgress);
    if (!downloadRes.success) return downloadRes;

    return await saveVideoToCameraRoll(downloadRes.path);
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * LOCAL SCREENSHOT → save
 */
export const saveScreenshot = async (imagePath) => {
  return await saveImageToCameraRoll(imagePath);
};
