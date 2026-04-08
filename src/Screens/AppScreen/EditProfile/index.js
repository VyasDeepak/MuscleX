import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { imagespath } from '../../../theme/imagespath';
import { Colors, fonts } from '../../../theme/Colors';
import Appbutton from '../../../Components/Appbutton';
import { Appinput } from '../../../Components/Appinput';
import AppHeader from '../../../navigation/navBar';
import { useUserStore } from '../../../zustand/userStore';
import AuthService from '../../../api/services/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email')
    .nullable(),
  about: Yup.string()
    .max(500, 'About must be less than 500 characters')
    .nullable(),
  location: Yup.string()
    .max(100, 'Location must be less than 100 characters')
    .nullable(),
});

const EditProfile = (props) => {
  const { user, setUser, loading } = useUserStore();

  useEffect(() => {
    AppHeader({
      ...props,
      leftClick: () => {props?.navigation?.goBack()},
      LeftIcon: true,
      leftImage: imagespath.back_arrow,
      Title: 'Edit Profile',
    });
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await AuthService.updateProfile(values);

      if (response?.id) {
        setUser(response);
        Alert.alert('Success', 'Profile updated successfully');
        props.navigation.goBack();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      Alert.alert('Update Error', err?.message || 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Select Photo Section */}
        <View style={styles.selectPhotoSection}>
          <Text style={styles.sectionTitle}>Select Photo</Text>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => chooseImage()}
          >
            <Image
              source={imagespath.app_log}
              style={styles.cameraIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Personal Details Section */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle,{marginHorizontal : 12}]}>Personal Details</Text>

          <Formik
            initialValues={{
              name: user?.name || '',
              email: user?.email || '',
              about: user?.about || '',
              location: user?.location || '',
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Appinput
                  label="Your Name"
                  placeholder="Your Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  ISerror={touched.name && errors.name ? errors.name : ''}
                  editable={!loading}
                />

                <Appinput
                  label="Email"
                  placeholder="Your Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  ISerror={touched.email && errors.email ? errors.email : ''}
                  editable={!loading}
                />

                <Appinput
                  label="About You"
                  placeholder="Write about yourself"
                  value={values.about}
                  onChangeText={handleChange('about')}
                  onBlur={handleBlur('about')}
                  ISerror={touched.about && errors.about ? errors.about : ''}
                  editable={!loading}
                />

                <Appinput
                  label="Location"
                  placeholder="Your Location"
                  value={values.location}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  marginBottom={24}
                  ISerror={touched.location && errors.location ? errors.location : ''}
                  editable={!loading}
                />

                {/* Save Button */}
                <Appbutton
                  title={loading ? 'Saving...' : 'Save'}
                  onPress={handleSubmit}
                  width="85%"
                  backgroundColor={Colors.BUTTON_COLOR}
                  disabled={loading}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  scrollContent: {
    paddingBottom: 30,
    marginTop : '18%'
  },
  selectPhotoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: fonts.font_size_16,
    fontFamily: fonts.robot_bold,
    color: Colors.BLACK,
    marginBottom: 12,
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff5aa5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 28,
    height: 28,
    tintColor: Colors.WHITE,
  },
  detailsSection: {
    // marginBottom: 24,
    marginHorizontal : 12
  },
});