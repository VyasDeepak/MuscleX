import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';

// ─── Pill / Badge ─────────────────────────────────────────────────────────────
interface PillProps {
  label: string;
  color?: string;
  bg?: string;
  style?: ViewStyle;
}
export function Pill({
  label,
  color = COLORS.accent,
  bg = 'rgba(181,242,58,0.15)',
  style,
}: PillProps) {
  return (
    <View style={[pillStyles.wrap, { backgroundColor: bg }, style]}>
      <Text style={[pillStyles.text, { color }]}>{label}</Text>
    </View>
  );
}
const pillStyles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 11, fontWeight: '600' },
});

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}
export function SectionHeader({
  title,
  actionLabel = 'See all',
  onAction,
  style,
}: SectionHeaderProps) {
  return (
    <View style={[sectionStyles.row, style]}>
      <Text style={sectionStyles.title}>{title}</Text>
      {onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={sectionStyles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  action: { fontSize: 12, color: COLORS.accent },
});

// ─── Icon Button ──────────────────────────────────────────────────────────────
interface IconBtnProps {
  name: string;
  size?: number;
  color?: string;
  bg?: string;
  radius?: number;
  onPress?: () => void;
  style?: ViewStyle;
}
export function IconBtn({
  name,
  size = 20,
  color = COLORS.text,
  bg = COLORS.surface,
  radius = 12,
  onPress,
  style,
}: IconBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        iconBtnStyles.btn,
        { backgroundColor: bg, borderRadius: radius },
        style,
      ]}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
const iconBtnStyles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ─── Stat Chip ────────────────────────────────────────────────────────────────
interface StatChipProps {
  value: string;
  label: string;
  style?: ViewStyle;
}
export function StatChip({ value, label, style }: StatChipProps) {
  return (
    <View style={[chipStyles.wrap, style]}>
      <Text style={chipStyles.value}>{value}</Text>
      <Text style={chipStyles.label}>{label}</Text>
    </View>
  );
}
const chipStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  value: { fontSize: 18, fontWeight: '700', color: COLORS.accent },
  label: { fontSize: 10, color: COLORS.muted, marginTop: 2 },
});

// ─── Dot Meta ─────────────────────────────────────────────────────────────────
interface DotMetaProps {
  label: string;
  color?: string;
}
export function DotMeta({ label, color = COLORS.accent }: DotMetaProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View
        style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }}
      />
      <Text style={{ fontSize: 11, color: COLORS.muted }}>{label}</Text>
    </View>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  progress: number; // 0–1
  label?: string;
  rightLabel?: string;
  color?: string;
  style?: ViewStyle;
}
export function ProgressBar({
  progress,
  label,
  rightLabel,
  color = COLORS.accent,
  style,
}: ProgressBarProps) {
  return (
    <View style={[pbStyles.wrap, style]}>
      {(label || rightLabel) && (
        <View style={pbStyles.row}>
          {label && <Text style={pbStyles.label}>{label}</Text>}
          {rightLabel && (
            <Text style={[pbStyles.label, { color }]}>{rightLabel}</Text>
          )}
        </View>
      )}
      <View style={pbStyles.track}>
        <View
          style={[
            pbStyles.fill,
            {
              width: `${Math.min(progress * 100, 100)}%` as any,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}
const pbStyles = StyleSheet.create({
  wrap: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 12, color: COLORS.muted },
  track: { height: 8, backgroundColor: COLORS.surface2, borderRadius: 99 },
  fill: { height: 8, borderRadius: 99 },
});
