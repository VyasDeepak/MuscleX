import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const typography = StyleSheet.create({
  displayLg: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 1,
  },
  displayMd: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.muted,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.muted,
    letterSpacing: 0.3,
  },
  accent: {
    color: COLORS.accent,
  },
});
