import React from "react";
import { View, Text, Image } from "react-native";

const FrameTwo = ({ styles, user, renderWithMedia }) => (
  <View style={[styles.previewCard, styles.selectedPreview]}>
    {renderWithMedia(
      <View style={styles.variant2BottomRow}>
        <View style={styles.variant2TextCard}>
          <View style={styles.variant2TextArea}>
            <Text style={[styles.postBottomName, styles.postBottomNameBlue]} numberOfLines={1}>
              {user.userName}
            </Text>
            <Text style={styles.variant2Tagline} numberOfLines={2}>
              {user.tagline}
            </Text>
            <Text style={styles.variant2Mobile}>
              {user.mobileNumber}
            </Text>
          </View>
          <Image
            source={user.avatar}
            style={styles.variant2RightImage}
            resizeMode="cover"
          />
        </View>
      </View>
    )}
  </View>
);

export default FrameTwo;
