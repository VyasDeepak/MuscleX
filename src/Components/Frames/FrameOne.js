import React from "react";
import { View, Text, Image } from "react-native";

const FrameOne = ({ styles, user, renderWithMedia }) => (
  <View style={[styles.previewCard, styles.selectedPreview]}>
    {renderWithMedia(
      <>
        {/* HomeScreen ke first design jaisa: sirf bottom strip + side photo */}
        <View style={[styles.postBottomStrip, styles.postBottomStripPink]}>
          <View style={styles.postBottomTextArea}>
            <Text style={[styles.postBottomName, styles.postBottomNamePink]} numberOfLines={1}>
              {user.userName}
            </Text>
            <Text style={styles.postBottomTagline} numberOfLines={2}>
              {user.tagline}
            </Text>
            <Text style={styles.postBottomMobile}>
              {user.mobileNumber}
            </Text>
          </View>
        </View>
        <Image
          source={user.avatar}
          style={[styles.postPhotoCard, styles.postPhotoCardPink]}
          resizeMode="cover"
        />
      </>
    )}
  </View>
);

export default FrameOne;
