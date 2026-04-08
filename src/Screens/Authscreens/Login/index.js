import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { Appinput } from '../../../Components/Appinput';
import Appbutton from '../../../Components/Appbutton';
import { Colors } from '../../../theme/Colors';
import { imagespath } from '../../../theme/imagespath';
import { useUserStore } from '../../../zustand/userStore';
import AuthService from '../../../api/services/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showToastMessage } from '../../../api/Toast';
const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits'),
});

const Login = props => {
  const { loading } = useUserStore();
 

  const handleSubmit = async values => {
    try {
      console.error('Submitting phone number:', values);
      const response = await AuthService.login(values);

      if (!response?.success && response?.data?.success) {
        throw new Error(response?.message || 'Login failed. Please try again.');
      }

      props.navigation.navigate('OtpScreen', {
        values,
      });
      showToastMessage('OTP sent successfully', 'success');
    } catch (err) {
      console.error('Login error:', err);
      console.log('Error response:', JSON.stringify(err));
      showToastMessage(
        err?.response?.data?.message || 'Failed to send OTP',
        'danger',
      );
    } finally {
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Image
            source={imagespath.app_log}
            style={styles.app_logo}
            resizeMode="contain"
          />

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={imagespath.Adpik}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Formik
            initialValues={{ phoneNumber: '', countryCode: '91' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Appinput
                  label="Phone Number"
                  placeholder="Enter Your Phone Number"
                  keyboardType="phone-pad"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  marginBottom={16}
                  ISerror={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : ''
                  }
                  editable={!loading}
                />

                <Appbutton
                  title={loading ? 'Signing In...' : 'Sign In'}
                  onPress={handleSubmit}
                  backgroundColor={Colors.btn_color}
                  color={Colors.WHITE}
                  fontSize={16}
                  marginTop={16}
                  disabled={loading}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.08,
  },
  app_logo: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#c62828',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontWeight: '500',
  },
});
