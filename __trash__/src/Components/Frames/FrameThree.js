import React from "react";
import { View, Text, Image } from "react-native";

const FrameThree = ({ styles, user, renderWithMedia }) => (
  <View style={[styles.previewCard, styles.selectedPreview]}>
    {renderWithMedia(
      <View style={[styles.postBottomStrip, styles.postBottomStripPurple, styles.variant3Strip]}>
        <Image
          source={user.avatar}
          style={styles.variant3StripAvatar}
          resizeMode="cover"
        />
        <View style={styles.variant3StripText}>
          <Text style={[styles.postBottomName, styles.postBottomNamePurple]} numberOfLines={1}>
            {user.userName}
          </Text>
          <Text style={styles.variant3StripTagline} numberOfLines={2}>
            {user.tagline}
          </Text>
          <Text style={styles.variant3StripMobile}>
            {user.mobileNumber}
          </Text>
        </View>
      </View>
    )}
  </View>
);

export default FrameThree;
