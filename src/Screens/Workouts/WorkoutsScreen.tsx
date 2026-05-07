import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { Pill } from '../../Components/UI/Ui';
import { WORKOUTS, FILTER_TAGS } from '../../data/workouts';

const { width } = Dimensions.get('window');

interface Props {
  navigation?: any;
}

export default function WorkoutsScreen({ navigation }: Props) {
  const [selectedTag, setSelectedTag] = useState('All');
  
  const filteredWorkouts = selectedTag === 'All' 
    ? WORKOUTS 
    : WORKOUTS.filter(w => w.tag === selectedTag);

  return (
    <SafeAreaView style={s.safe}>
      {/* ── Header ── */}
      <View style={s.header}>
        <Text style={s.title}>Workouts</Text>
        <TouchableOpacity>
          <Icon name="magnify" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* ── Filter Tags ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.tagScroll}
        contentContainerStyle={s.tagContent}
      >
        {FILTER_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              s.tag,
              selectedTag === tag && s.tagActive,
            ]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text
              style={[
                s.tagText,
                selectedTag === tag && s.tagTextActive,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Workouts List ── */}
      <FlatList
        data={filteredWorkouts}
        renderItem={({ item: workout }) => (
          <TouchableOpacity
            style={s.workoutCard}
            onPress={() =>
              navigation?.navigate('ExerciseDetails', { workout })
            }
          >
            {/* Card Background */}
            <View
              style={[
                s.cardBackground,
                { backgroundColor: workout.color },
              ]}
            />

            {/* Card Content */}
            <View style={s.cardContent}>
              <View style={s.cardTop}>
                <View style={s.cardInfo}>
                  <Text style={s.workoutTitle}>{workout.title}</Text>
                  <Text style={s.workoutDesc}>{workout.targetMuscle}</Text>
                </View>
                <View
                  style={[
                    s.difficultyBadge,
                    {
                      backgroundColor: workout.accentColor,
                    },
                  ]}
                >
                  <Text style={s.difficultyText}>
                    {workout.difficulty.charAt(0)}
                  </Text>
                </View>
              </View>

              <View style={s.cardStats}>
                <View style={s.statItem}>
                  <Icon name="clock-outline" size={14} color={COLORS.text} />
                  <Text style={s.statText}>{workout.duration}</Text>
                </View>
                <View style={s.statItem}>
                  <Icon name="fire" size={14} color={COLORS.accent3} />
                  <Text style={s.statText}>{workout.calories}</Text>
                </View>
                <View style={s.statItem}>
                  <Icon name="barbell" size={14} color={COLORS.accent} />
                  <Text style={s.statText}>{workout.exercises.length} ex</Text>
                </View>
              </View>

              <View style={s.cardFooter}>
                <View style={s.ratingWrap}>
                  <Icon name="star" size={12} color={COLORS.accent} />
                  <Text style={s.rating}>
                    {workout.rating?.toFixed(1) || '4.5'} ({workout.reviews || 0})
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={COLORS.muted} />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={s.listContent}
      />

      <View style={{ height: 32 }} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
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
  tagScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tagContent: {
    gap: 8,
    paddingRight: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  tagTextActive: {
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  workoutCard: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 4,
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(255,255,255,0.2)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  workoutDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  difficultyBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  cardStats: {
    flexDirection: 'row',
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
});
