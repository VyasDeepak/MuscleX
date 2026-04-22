import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../theme/colors';

interface Props {
  navigation?: any;
}

const GOALS = [
  'Lose Weight',
  'Build Muscle',
  'Improve Endurance',
  'Stay Active',
];

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation?.replace('Main');
    }, 1000);
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        style={s.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back */}
          <TouchableOpacity
            style={s.back}
            onPress={() => navigation?.goBack?.()}
          >
            <Icon name="chevron-left" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={s.content}>
            <Text style={s.title}>Create Account</Text>
            <Text style={s.subtitle}>Start your fitness journey today</Text>

            {/* Fields */}
            <View style={s.form}>
              {/* Name */}
              <View style={s.inputWrap}>
                <Icon
                  name="account-outline"
                  size={18}
                  color={COLORS.muted}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.input}
                  placeholder="Full name"
                  placeholderTextColor={COLORS.muted}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View style={s.inputWrap}>
                <Icon
                  name="email-outline"
                  size={18}
                  color={COLORS.muted}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.input}
                  placeholder="Email address"
                  placeholderTextColor={COLORS.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={s.inputWrap}>
                <Icon
                  name="lock-outline"
                  size={18}
                  color={COLORS.muted}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.input}
                  placeholder="Password (min 8 chars)"
                  placeholderTextColor={COLORS.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Icon
                    name={showPass ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={COLORS.muted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Goal Selection */}
            <Text style={s.goalTitle}>What's your main goal?</Text>
            <View style={s.goalsGrid}>
              {GOALS.map(g => (
                <TouchableOpacity
                  key={g}
                  style={[s.goalChip, goal === g && s.goalChipActive]}
                  onPress={() => setGoal(g)}
                >
                  <Text
                    style={[s.goalChipText, goal === g && s.goalChipTextActive]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Terms */}
            <Text style={s.terms}>
              By creating an account, you agree to our{' '}
              <Text style={{ color: COLORS.accent }}>Terms of Service</Text> and{' '}
              <Text style={{ color: COLORS.accent }}>Privacy Policy</Text>
            </Text>

            {/* Submit */}
            <TouchableOpacity
              style={[s.signupBtn, loading && { opacity: 0.7 }]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={s.signupBtnText}>
                {loading ? 'Creating account…' : 'Create Account'}
              </Text>
              {!loading && <Icon name="arrow-right" size={20} color="#000" />}
            </TouchableOpacity>

            {/* Login */}
            <View style={s.loginRow}>
              <Text style={s.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                <Text style={s.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  kav: { flex: 1 },
  back: { paddingHorizontal: 20, paddingTop: 12 },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: COLORS.muted, marginBottom: 28 },
  form: { gap: 14, marginBottom: 24 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.text },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  goalChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  goalChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  goalChipText: { fontSize: 13, color: COLORS.muted, fontWeight: '500' },
  goalChipTextActive: { color: '#000' },
  terms: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  signupBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  signupBtnText: { fontSize: 16, fontWeight: '700', color: '#000' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, color: COLORS.muted },
  loginLink: { fontSize: 14, color: COLORS.accent, fontWeight: '700' },
});
