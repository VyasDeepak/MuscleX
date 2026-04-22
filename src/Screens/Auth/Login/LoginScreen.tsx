import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../theme/colors';
import { ProgressBar } from '../../../Components/UI/Ui';

interface MenuItem {
  icon: string;
  label: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: 'shield-check-outline',  label: 'My Goals',      badge: '3 active' },
  { icon: 'chart-line',            label: 'Progress'                          },
  { icon: 'account-group-outline', label: 'Community',     badge: 'New'       },
  { icon: 'trophy-outline',        label: 'Achievements'                      },
  { icon: 'bell-outline',          label: 'Notifications'                     },
  { icon: 'cog-outline',           label: 'Settings'                          },
  { icon: 'help-circle-outline',   label: 'Help & Support'                    },
];

const STAT_ITEMS = [
  { value: '113',  label: 'Followers' },
  { value: '28',   label: 'Workouts'  },
  { value: '4.2k', label: 'Calories'  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Top Bar ── */}
        <View style={s.topBar}>
          <Text style={s.pageTitle}>Profile</Text>
          <TouchableOpacity style={s.settingsBtn}>
            <Icon name="cog-outline" size={20} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {/* ── Avatar + Name ── */}
        <View style={s.profileBlock}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Icon name="account" size={44} color={COLORS.muted} />
            </View>
            <TouchableOpacity
              style={s.editBadge}
              onPress={() => Alert.alert('Edit Photo', 'Photo editing coming soon!')}
            >
              <Icon name="pencil" size={12} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={s.name}>Alex Johnson</Text>
          <Text style={s.handle}>@alex.fitflow</Text>

          {/* Stats Row */}
          <View style={s.statsRow}>
            {STAT_ITEMS.map((st, i) => (
              <React.Fragment key={st.label}>
                {i > 0 && <View style={s.statDivider} />}
                <View style={s.statCell}>
                  <Text style={[s.statVal, i === 1 && { color: COLORS.accent }]}>{st.value}</Text>
                  <Text style={s.statLabel}>{st.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Edit Profile Button ── */}
        <TouchableOpacity
          style={s.editBtn}
          onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
        >
          <Text style={s.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* ── Weekly Progress ── */}
        <View style={s.progressCard}>
          <Text style={s.progressTitle}>Weekly Goal</Text>
          <ProgressBar
            progress={0.8}
            label="4 of 5 workout days"
            rightLabel="80%"
            style={{ marginTop: 10 }}
          />
          <View style={s.progressDots}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <View key={i} style={[s.dayDot, i < 4 && s.dayDotDone]}>
                <Text style={[s.dayLabel, i < 4 && { color: '#000' }]}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Level Badge ── */}
        <View style={s.levelCard}>
          <View style={s.levelLeft}>
            <View style={s.levelBadge}>
              <Icon name="fire" size={22} color="#000" />
            </View>
            <View>
              <Text style={s.levelTitle}>Intermediate</Text>
              <Text style={s.levelSub}>Level 12 · 2,340 XP</Text>
            </View>
          </View>
          <ProgressBar
            progress={0.65}
            rightLabel="65%"
            style={{ flex: 1, marginLeft: 16 }}
          />
        </View>

        {/* ── Menu ── */}
        <View style={s.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={s.menuItem}
              onPress={() => Alert.alert(item.label, `${item.label} coming soon!`)}
            >
              <View style={s.menuIcon}>
                <Icon name={item.icon} size={18} color={COLORS.accent} />
              </View>
              <Text style={s.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={s.menuBadge}>
                  <Text style={s.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Icon name="chevron-right" size={18} color={COLORS.muted} style={{ marginLeft: item.badge ? 8 : 'auto' as any }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity
          style={s.logoutBtn}
          onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}
        >
          <Icon name="logout" size={18} color={COLORS.danger} />
          <Text style={s.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: COLORS.bg },
  scroll:        { flex: 1 },
  topBar:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  pageTitle:     { fontSize: 26, fontWeight: '800', color: COLORS.text },
  settingsBtn:   { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center' },
  profileBlock:  { alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 },
  avatarWrap:    { position: 'relative', marginBottom: 14 },
  avatar:        { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.surface2, borderWidth: 3, borderColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' },
  editBadge:     { position: 'absolute', bottom: 2, right: 2, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' },
  name:          { fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  handle:        { fontSize: 13, color: COLORS.muted, marginBottom: 20 },
  statsRow:      { flexDirection: 'row', alignItems: 'center' },
  statDivider:   { width: 1, height: 30, backgroundColor: COLORS.border, marginHorizontal: 28 },
  statCell:      { alignItems: 'center' },
  statVal:       { fontSize: 22, fontWeight: '700', color: COLORS.text },
  statLabel:     { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  editBtn:       { marginHorizontal: 20, marginBottom: 16, borderRadius: 14, borderWidth: 1.5, borderColor: COLORS.border, paddingVertical: 14, alignItems: 'center' },
  editBtnText:   { fontSize: 14, fontWeight: '600', color: COLORS.text },
  progressCard:  { marginHorizontal: 20, marginBottom: 14, backgroundColor: COLORS.surface, borderRadius: 18, padding: 18 },
  progressTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  progressDots:  { flexDirection: 'row', gap: 6, marginTop: 14, justifyContent: 'center' },
  dayDot:        { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.surface2, alignItems: 'center', justifyContent: 'center' },
  dayDotDone:    { backgroundColor: COLORS.accent },
  dayLabel:      { fontSize: 11, fontWeight: '700', color: COLORS.muted },
  levelCard:     { marginHorizontal: 20, marginBottom: 16, backgroundColor: COLORS.surface, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center' },
  levelLeft:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginRight: 0 },
  levelBadge:    { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', marginRight: 4 },
  levelTitle:    { fontSize: 14, fontWeight: '700', color: COLORS.text },
  levelSub:      { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  menu:          { marginHorizontal: 20, gap: 4 },
  menuItem:      { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, gap: 14 },
  menuIcon:      { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(181,242,58,0.1)', alignItems: 'center', justifyContent: 'center' },
  menuLabel:     { flex: 1, fontSize: 15, fontWeight: '500', color: COLORS.text },
  menuBadge:     { backgroundColor: 'rgba(181,242,58,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.accent },
  logoutBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, marginBottom: 8 },
  logoutText:    { fontSize: 14, fontWeight: '600', color: COLORS.danger },
});