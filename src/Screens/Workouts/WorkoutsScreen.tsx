import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { SectionHeader, Pill } from '../../Components/UI/Ui';
import { WORKOUTS } from '../../data/workouts';

const { width } = Dimensions.get('window');
const CARD_W = (width - 56) / 2;

const R = 34;
const CIRC = 2 * Math.PI * R;

interface Props {
  navigation?: any;
}

export default function HomeScreen({ navigation }: Props) {
  const calorieProgress = 0.72;
  const strokeDash = CIRC * calorieProgress;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={s.header}>
          <Icon name="menu" size={22} color={COLORS.muted} />
          <Text style={s.logo}>FITFLOW</Text>
          <TouchableOpacity>
            <Icon name="bell-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* ── Greeting ── */}
        <View style={s.greeting}>
          <Text style={s.greetSub}>Good Morning,</Text>
          <Text style={s.greetName}>Alex! 👋</Text>
        </View>

        {/* ── Goal Card ── */}
        <View style={s.goalCard}>
          <View style={s.goalStats}>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Goal</Text>
              <Text style={s.statVal}>
                864 <Text style={s.statUnit}>/ 1200 kcal</Text>
              </Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Steps</Text>
              <Text style={s.statVal}>
                8k<Text style={s.statUnit}> / 10k</Text>
              </Text>
            </View>
            <View style={s.statItem}>
              <Text style={s.statLabel}>Active</Text>
              <Text style={s.statVal}>
                38<Text style={s.statUnit}> min</Text>
              </Text>
            </View>
          </View>

          {/* SVG Ring */}
          <View style={s.ringWrap}>
            <Svg width={84} height={84} viewBox="0 0 84 84">
              <Circle
                cx="42"
                cy="42"
                r={R}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth={7}
              />
              <Circle
                cx="42"
                cy="42"
                r={R}
                fill="none"
                stroke={COLORS.accent}
                strokeWidth={7}
                strokeDasharray={`${strokeDash} ${CIRC}`}
                strokeDashoffset={CIRC * 0.25}
                strokeLinecap="round"
                rotation="-90"
                origin="42,42"
              />
            </Svg>
            <View style={s.ringCenter}>
              <Icon name="lightning-bolt" size={18} color={COLORS.accent} />
              <Text style={s.ringPct}>
                {Math.round(calorieProgress * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* ── Quick Stats ── */}
        <View style={s.quickStats}>
          {[
            {
              icon: 'fire',
              label: 'Streak',
              val: '7 days',
              color: COLORS.accent3,
            },
            {
              icon: 'dumbbell',
              label: 'Week',
              val: '4 done',
              color: COLORS.accent,
            },
            {
              icon: 'heart-pulse',
              label: 'Avg HR',
              val: '142 bpm',
              color: COLORS.danger,
            },
          ].map(q => (
            <View key={q.label} style={s.quickItem}>
              <Icon name={q.icon} size={18} color={q.color} />
              <Text style={s.quickVal}>{q.val}</Text>
              <Text style={s.quickLabel}>{q.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Today's Plan ── */}
        <View style={s.sectionPad}>
          <SectionHeader
            title="Today's Plan"
            onAction={() => navigation?.navigate('Workouts')}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.planScroll}
        >
          {WORKOUTS.map(w => (
            <TouchableOpacity
              key={w.id}
              style={[s.planCard, { backgroundColor: w.color, width: CARD_W }]}
              onPress={() =>
                navigation?.navigate('ExerciseDetails', { workout: w })
              }
            >
              <View style={[s.planIcon, { backgroundColor: w.accentColor }]}>
                <Icon name="dumbbell" size={16} color="#000" />
              </View>
              <View style={s.planOverlay}>
                <Text style={s.planTitle}>{w.title}</Text>
                <Text style={s.planMeta}>
                  {w.duration} · {w.calories}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── My Routines ── */}
        <View style={[s.sectionPad, { marginTop: 24 }]}>
          <SectionHeader
            title="My Routines"
            onAction={() => navigation?.navigate('Workouts')}
          />
          {WORKOUTS.map(w => (
            <TouchableOpacity
              key={w.id}
              style={s.routineItem}
              onPress={() =>
                navigation?.navigate('ExerciseDetails', { workout: w })
              }
            >
              <View style={[s.routineThumb, { backgroundColor: w.color }]}>
                <Icon name="dumbbell" size={20} color={w.accentColor} />
              </View>
              <View style={s.routineInfo}>
                <Text style={s.routineTitle}>{w.title}</Text>
                <Text style={s.routineSub}>
                  {w.exercises
                    .slice(0, 2)
                    .map(e => e.name)
                    .join(' · ')}
                </Text>
              </View>
              <View style={s.routineMeta}>
                <Text style={s.routineTime}>{w.duration}</Text>
                <Pill label={w.calories} />
              </View>
            </TouchableOpacity>
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
    paddingBottom: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 3,
  },
  greeting: { paddingHorizontal: 20, paddingBottom: 20 },
  greetSub: { fontSize: 14, color: COLORS.muted, marginBottom: 2 },
  greetName: { fontSize: 26, fontWeight: '700', color: COLORS.text },
  goalCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalStats: { gap: 14 },
  statItem: { gap: 2 },
  statLabel: { fontSize: 11, color: COLORS.muted },
  statVal: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  statUnit: { fontSize: 12, color: COLORS.muted },
  ringWrap: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: { position: 'absolute', alignItems: 'center' },
  ringPct: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 2,
  },
  quickStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 10,
  },
  quickItem: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  quickVal: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  quickLabel: { fontSize: 10, color: COLORS.muted },
  sectionPad: { paddingHorizontal: 20 },
  planScroll: { paddingHorizontal: 20, gap: 12, paddingBottom: 4 },
  planCard: {
    borderRadius: 18,
    height: 170,
    padding: 14,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  planIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planOverlay: { gap: 4 },
  planTitle: { fontSize: 13, fontWeight: '700', color: '#fff' },
  planMeta: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  routineThumb: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineInfo: { flex: 1, gap: 3 },
  routineTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  routineSub: { fontSize: 12, color: COLORS.muted },
  routineMeta: { alignItems: 'flex-end', gap: 6 },
  routineTime: { fontSize: 11, color: COLORS.muted },
});
