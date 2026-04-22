import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { Pill } from '../../Components/UI/Ui';
import { WORKOUTS, Workout } from '../../data/workouts';

const { width } = Dimensions.get('window');

interface Props {
  route?: { params?: { workout?: Workout } };
  navigation?: any;
}

export default function ExerciseDetailsScreen({ route, navigation }: Props) {
  const workout = route?.params?.workout ?? WORKOUTS[0];
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'exercises' | 'instructions'>(
    'exercises',
  );

  const diffColor =
    workout.difficulty === 'Advanced'
      ? COLORS.accent3
      : workout.difficulty === 'Intermediate'
      ? COLORS.accent2
      : COLORS.accent;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation?.goBack?.()}
        >
          <Icon name="chevron-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {workout.title}
        </Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => setLiked(!liked)}
        >
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? COLORS.danger : COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Hero ── */}
        <View style={[styles.hero, { backgroundColor: workout.color }]}>
          <Text style={styles.heroEmoji}>🏋️</Text>
          <View style={styles.heroBadges}>
            <Pill
              label={workout.tag}
              color={workout.accentColor}
              bg="rgba(0,0,0,0.55)"
            />
            <Pill
              label={workout.difficulty}
              color={diffColor}
              bg="rgba(0,0,0,0.55)"
            />
          </View>
        </View>

        {/* ── Title ── */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{workout.title.toUpperCase()}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={14} color={COLORS.muted} />
              <Text style={styles.metaText}>{workout.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="fire" size={14} color={COLORS.accent} />
              <Text style={[styles.metaText, { color: COLORS.accent }]}>
                {workout.calories}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="dumbbell" size={14} color={COLORS.accent2} />
              <Text style={[styles.metaText, { color: COLORS.accent2 }]}>
                {workout.difficulty}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{workout.description}</Text>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'Target', value: workout.targetMuscle },
            { label: 'Equipment', value: workout.equipment },
            { label: 'Exercises', value: `${workout.exercises.length}` },
          ].map((st, i) => (
            <View
              key={st.label}
              style={[styles.statBox, i === 1 && styles.statBoxCenter]}
            >
              <Text style={styles.statLabel}>{st.label}</Text>
              <Text style={styles.statValue}>{st.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabs}>
          {(['exercises', 'instructions'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab && styles.tabLabelActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Exercises ── */}
        {activeTab === 'exercises' && (
          <View style={styles.section}>
            {workout.exercises.map((ex, i) => (
              <View key={ex.id} style={styles.exerciseItem}>
                <View style={styles.exLeft}>
                  <View style={styles.exNum}>
                    <Text style={styles.exNumText}>{i + 1}</Text>
                  </View>
                  <View style={styles.exInfo}>
                    <Text style={styles.exName}>{ex.name}</Text>
                    <Text style={styles.exDetail}>
                      {ex.sets} sets · {ex.reps} reps
                    </Text>
                  </View>
                </View>
                <Text style={styles.calText}>{ex.calories} cal</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Instructions ── */}
        {activeTab === 'instructions' && (
          <View style={styles.section}>
            {workout.instructions.map((instr, i) => (
              <View key={i} style={styles.instrItem}>
                <View style={styles.instrNum}>
                  <Text style={styles.instrNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.instrText}>{instr}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() =>
            Alert.alert(
              'Workout Started!',
              `Starting ${workout.title}. Get ready!`,
            )
          }
        >
          <Icon name="play-circle" size={22} color="#000" />
          <Text style={styles.startBtnText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: 8,
  },
  hero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroEmoji: { fontSize: 72 },
  heroBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  titleSection: { paddingHorizontal: 16, paddingTop: 20, marginBottom: 20 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statBoxCenter: { borderTopColor: COLORS.accent, borderTopWidth: 2 },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: COLORS.accent },
  tabLabel: { fontSize: 13, fontWeight: '600', color: COLORS.muted },
  tabLabelActive: { color: '#000' },
  section: { paddingHorizontal: 16, gap: 10 },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  exNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exNumText: { color: '#000', fontSize: 14, fontWeight: '700' },
  exInfo: { flex: 1 },
  exName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  exDetail: { color: COLORS.muted, fontSize: 12 },
  calText: { color: COLORS.accent, fontSize: 12, fontWeight: '700' },
  instrItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 6,
  },
  instrNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    marginTop: 2,
  },
  instrNumText: { color: COLORS.accent, fontSize: 12, fontWeight: '700' },
  instrText: { flex: 1, color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  startBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  startBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
