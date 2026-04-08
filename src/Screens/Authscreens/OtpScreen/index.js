import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import Appbutton from "../../../Components/Appbutton";
import { Colors, fonts } from "../../../theme/Colors";
import { imagespath } from "../../../theme/imagespath";
import AppHeader from "../../../navigation/navBar";
import { useUserStore } from "../../../zustand/userStore";
import AuthService from "../../../api/services/auth";

const { width, height } = Dimensions.get("window");

const OtpScreen = (props) => {
  const otpInput = useRef(null);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { user, setLoading, loading, setError, error, login } = useUserStore();

useLayoutEffect(() => {
  props.navigation.setOptions({
    headerTitle: "Verification Code",
  });
}, [props.navigation]);

  // Resend timer effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const methodOtp = (key, value) => {
    // key is 'otp' per usage; we only track otp here
    setOtp(value);
  };

  const handleResendOtp = async () => {
    try {
      setCanResend(false);
      setResendTimer(30); // 30 second cooldown
      // Call resend OTP API
      Alert.alert("Success", "OTP has been resent to your phone number");
    } catch (err) {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  const handleVerify = async () => {
    try {
      // Validate OTP
      if (!otp || otp.length < 4) {
        Alert.alert("Error", "Please enter a valid OTP");
        return;
      }

      setLoading(true);
      setError(null);

      // Call verify OTP API
      const response = await AuthService.verifyOtp({
        ...props?.route?.params?.values,
        otp,
      });

      // Validate response
      if (!response?.success) {
        throw new Error(response?.message || "OTP verification failed");
      }

      // Extract user data and tokens from response
      const userData = {
        id: response.user?.id || "",
        phoneNumber: response.user?.phoneNumber || user.phoneNumber,
        email: response.user?.email || "",
        name: response.user?.name || "",
        countryCode: response.user?.countryCode || "",
      };

      // Store all auth data using the login action to set isLoggedIn = true
      const token = response?.refreshToken || response?.token;
      login(userData, token);

      // Navigate to home screen after successful verification
      setTimeout(() => {
        props?.navigation?.navigate("BottomTab");
      }, 500);
    } catch (err) {
      const errorMessage =
        err.message || "OTP verification failed. Please try again.";
      Alert.alert("Verification Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section with Icon */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Image
              source={imagespath.app_log}
              style={styles.app_logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.subtitle}>
            We've sent a 4-digit verification code to your phone number. Please
            enter it below.
          </Text>

          {/* OTP Input Section */}
          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>Verification Code</Text>
            <View style={styles.otpContainer}>
              <OTPTextInput
                ref={otpInput}
                inputCount={4}
                handleTextChange={(text) => methodOtp("otp", text)}
                containerStyle={{ alignSelf: "center", justifyContent: "center" }}
                tintColor={Colors.BUTTON_COLOR}
                offTintColor={Colors.LIGHT_GRAY}
                textInputStyle={styles.otpInput}
                editable={!loading}n
                autoFocus={true}
              />
            </View>
            <Text style={styles.otpHint}>
              Enter the 4-digit code sent to your number
            </Text>
          </View>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <Appbutton
              title={loading ? "Verifying..." : "Verify"}
              onPress={handleVerify}
              backgroundColor={Colors.BUTTON_COLOR}
              color={Colors.WHITE}
              fontSize={16}
              marginTop={12}
              width={"100%"}
              disabled={loading || otp.length < 4}
            />
          </View>
        </View>

       
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  app_logo: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: "center",
    // marginBottom: 20,
    marginTop: 10
    // backgroundColor: "red",
  },
  scrollContent: {
    flexGrow: 1,
    // justifyContent: "space-between",
    // paddingTop: 20,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    // width: 80,
    // height: 80,
    // borderRadius: 40,
    // backgroundColor: "#e8f5e9",
    // justifyContent: "center",
    // alignItems: "center",
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
  },
  iconText: {
    fontSize: 40,
    color: "#4caf50",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: fonts.font_size_18  ,
    fontFamily: fonts.robot_bold,
    color: Colors.BLACK,
    marginBottom: 12,
    // fontWeight: "700",
  },
  subtitle: {
    fontSize: fonts.font_size_14 || 14,
    fontFamily: fonts.robot_regular,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
    width: "100%",
  },
  otpSection: {
    width: "100%",
    marginBottom: 24,
  },
  otpLabel: {
    fontSize: fonts.font_size_14 || 14,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.BLACK,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  otpContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  otpInputContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  otpInput: {
    width: 56,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    fontSize: fonts.font_size_24 || 24,
    fontFamily: fonts.robot_bold,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginHorizontal: 6,
  },
  otpHint: {
    fontSize: fonts.font_size_12 || 12,
    fontFamily: fonts.robot_regular,
    color: "#999",
    textAlign: "center",
    marginTop: 4,
  },
 
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: fonts.font_size_14 || 14,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.primary,
    fontWeight: "600",
  },
  resendButtonTextDisabled: {
    color: "#999",
  },
  buttonContainer: {
    width: '100%',
    // alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
