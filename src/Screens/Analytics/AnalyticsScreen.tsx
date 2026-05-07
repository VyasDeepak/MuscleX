import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { ProgressBar, SectionHeader } from '../../Components/UI/Ui';
import { WEEKLY_PROGRESS, MONTHLY_DATA, USER_STATS, WORKOUT_HISTORY } from '../../data/data';

const { width } = Dimensions.get('window');
const CARD_W = (width - 56) / 2;

interface Props {
  navigation?: any;
}

export default function AnalyticsScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.title}>Analytics</Text>
          <TouchableOpacity>
            <Icon name="calendar-range" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* ── Stats Cards ── */}
        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <View style={s.statIconWrap}>
              <Icon name="dumbbell" size={20} color={COLORS.accent} />
            </View>
            <Text style={s.statValue}>{MONTHLY_DATA.totalWorkouts}</Text>
            <Text style={s.statLabel}>Workouts</Text>
          </View>
          
          <View style={s.statCard}>
            <View style={s.statIconWrap}>
              <Icon name="fire" size={20} color={COLORS.accent3} />
            </View>
            <Text style={s.statValue}>{(MONTHLY_DATA.totalCalories / 1000).toFixed(1)}k</Text>
            <Text style={s.statLabel}>Calories</Text>
          </View>

          <View style={s.statCard}>
            <View style={s.statIconWrap}>
              <Icon name="clock" size={20} color={COLORS.accent2} />
            </View>
            <Text style={s.statValue}>{(MONTHLY_DATA.totalDuration / 60).toFixed(0)}h</Text>
            <Text style={s.statLabel}>Duration</Text>
          </View>

          <View style={s.statCard}>
            <View style={s.statIconWrap}>
              <Icon name="lightning-bolt" size={20} color={COLORS.accent} />
            </View>
            <Text style={s.statValue}>{USER_STATS.currentStreak}</Text>
            <Text style={s.statLabel}>Streak 🔥</Text>
          </View>
        </View>

        {/* ── Tab Selector ── */}
        <View style={s.tabBar}>
          <TouchableOpacity
            style={[s.tab, activeTab === 'week' && s.tabActive]}
            onPress={() => setActiveTab('week')}
          >
            <Text style={[s.tabLabel, activeTab === 'week' && s.tabLabelActive]}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.tab, activeTab === 'month' && s.tabActive]}
            onPress={() => setActiveTab('month')}
          >
            <Text style={[s.tabLabel, activeTab === 'month' && s.tabLabelActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Weekly Breakdown ── */}
        {activeTab === 'week' && (
          <View style={s.section}>
            <SectionHeader title="This Month Overview" />
            {WEEKLY_PROGRESS.map((week, idx) => (
              <View key={idx} style={s.weekCard}>
                <View style={s.weekHeader}>
                  <Text style={s.weekLabel}>{week.week}</Text>
                  <View style={s.weekStats}>
                    <Text style={s.weekStat}>{week.workouts} workouts</Text>
                    <Text style={s.weekStat}>•</Text>
                    <Text style={s.weekStat}>{(week.calories / 1000).toFixed(1)}k kcal</Text>
                  </View>
                </View>
                <View style={s.weekMeta}>
                  <Text style={s.weekMetaLabel}>Duration: {(week.duration / 60).toFixed(0)}h</Text>
                  <Text style={[s.weekMetaLabel, { color: COLORS.accent }]}>
                    Intensity: {week.avgIntensity}
                  </Text>
                </View>
                <ProgressBar
                  progress={(week.workouts / 5)}
                  label={`${week.workouts}/5 workouts`}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
          </View>
        )}

        {/* ── Monthly Stats ── */}
        {activeTab === 'month' && (
          <View style={s.section}>
            <View style={s.monthCard}>
              <Text style={s.monthTitle}>May 2026 Summary</Text>
              
              <View style={s.monthRow}>
                <View style={s.monthStat}>
                  <Text style={s.monthLabel}>Total Workouts</Text>
                  <Text style={s.monthValue}>{MONTHLY_DATA.totalWorkouts}</Text>
                </View>
                <View style={s.monthDivider} />
                <View style={s.monthStat}>
                  <Text style={s.monthLabel}>Avg per Week</Text>
                  <Text style={s.monthValue}>{MONTHLY_DATA.avgWorkoutsPerWeek.toFixed(1)}</Text>
                </View>
              </View>

              <View style={s.monthRow}>
                <View style={s.monthStat}>
                  <Text style={s.monthLabel}>Total Calories</Text>
                  <Text style={s.monthValue}>{(MONTHLY_DATA.totalCalories / 1000).toFixed(1)}k</Text>
                </View>
                <View style={s.monthDivider} />
                <View style={s.monthStat}>
                  <Text style={s.monthLabel}>Avg Daily</Text>
                  <Text style={s.monthValue}>{MONTHLY_DATA.avgCaloriesPerDay}</Text>
                </View>
              </View>

              <View style={s.monthHighlight}>
                <Text style={s.highlightLabel}>Best Day: <Text style={s.highlightValue}>{MONTHLY_DATA.bestDay}</Text></Text>
                <Text style={s.highlightLabel}>Favorite: <Text style={s.highlightValue}>{MONTHLY_DATA.favoriteExercise}</Text></Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Recent Workouts ── */}
        <View style={s.section}>
          <SectionHeader title="Recent Workouts" onAction={() => navigation?.navigate('Workouts')} />
          {WORKOUT_HISTORY.slice(0, 4).map((workout) => (
            <View key={workout.id} style={s.historyCard}>
              <View style={s.historyLeft}>
                <View style={s.historyIcon}>
                  <Icon name="dumbbell" size={18} color={COLORS.accent} />
                </View>
                <View style={s.historyInfo}>
                  <Text style={s.historyTitle}>{workout.workoutName}</Text>
                  <Text style={s.historyDate}>{workout.date} • {workout.time}</Text>
                </View>
              </View>
              <View style={s.historyRight}>
                <Text style={s.historyDuration}>{workout.duration}</Text>
                <View style={s.historyRating}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={12}
                      color={i < workout.rating ? COLORS.accent : COLORS.surface2}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(181,242,58,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: COLORS.accent,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.muted,
  },
  tabLabelActive: {
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  weekCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
  },
  weekHeader: {
    marginBottom: 10,
  },
  weekLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  weekStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weekStat: {
    fontSize: 11,
    color: COLORS.muted,
  },
  weekMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekMetaLabel: {
    fontSize: 11,
    color: COLORS.muted,
  },
  monthCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 20,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthStat: {
    alignItems: 'center',
    flex: 1,
  },
  monthLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  },
  monthValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.accent,
  },
  monthDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  monthHighlight: {
    backgroundColor: 'rgba(181,242,58,0.1)',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  highlightLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },
  highlightValue: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  historyCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(181,242,58,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 11,
    color: COLORS.muted,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  historyDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
  },
  historyRating: {
    flexDirection: 'row',
    gap: 2,
  },
});
