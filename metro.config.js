const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { sourceExts, assetExts } } = defaultConfig;

const config = {
  // If you are using react-native-svg-transformer, use this logic:
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Filter out svg from assetExts and add it to sourceExts for the transformer
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  resetCache: true, // Good for debugging, but you can remove later for speed
};

module.exports = mergeConfig(defaultConfig, config);