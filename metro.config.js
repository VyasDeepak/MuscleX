const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resetCache: true,
};

module.exports = mergeConfig(defaultConfig, config);