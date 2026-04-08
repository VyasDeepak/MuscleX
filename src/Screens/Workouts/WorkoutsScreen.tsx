import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/colors';
import { DotMeta, Pill } from '../../Components/UI';
import { WORKOUTS, FILTER_TAGS } from '../../data/workouts';

export default function WorkoutsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = WORKOUTS.filter((w) => {
    const matchQ = w.title.toLowerCase().includes(query.toLowerCase());
    const matchF = activeFilter === 'All' || w.tag.toLowerCase().includes(activeFilter.toLowerCase());
    return matchQ && matchF;
  });

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.title}>Workouts</Text>
          {/* Search */}
          <View style={s.searchBar}>
            <Icon name="magnify" size={16} color={COLORS.muted} />
            <TextInput
              style={s.searchInput}
              placeholder="Search workouts..."
              placeholderTextColor={COLORS.muted}
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>

        {/* ── Filter Chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filterRow}
        >
          {FILTER_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[s.filterChip, activeFilter === tag && s.filterChipActive]}
              onPress={() => setActiveFilter(tag)}
            >
              <Text style={[s.filterLabel, activeFilter === tag && s.filterLabelActive]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Workout Cards ── */}
        <View style={s.list}>
          {filtered.length === 0 ? (
            <View style={s.empty}>
              <Icon name="magnify" size={40} color={COLORS.muted} />
              <Text style={s.emptyText}>No workouts found</Text>
            </View>
          ) : (
            filtered.map((w) => (
              <TouchableOpacity key={w.id} style={s.card}>
                {/* Thumbnail */}
                <View style={[s.thumb, { backgroundColor: w.color }]}>
                  <Icon name="dumbbell" size={48} color={w.accentColor} style={{ opacity: 0.35 }} />
                  {/* Tag badge */}
                  <View style={s.thumbBadge}>
                    <Pill label={w.tag} color={w.accentColor} bg="rgba(0,0,0,0.55)" />
                  </View>
                </View>
                {/* Body */}
                <View style={s.cardBody}>
                  <Text style={s.cardTitle}>{w.title}</Text>
                  <View style={s.cardMeta}>
                    <DotMeta label={w.duration} color={w.accentColor} />
                    <DotMeta label={w.calories} color={w.accentColor} />
                    <DotMeta label={`${w.exercises.length} exercises`} color={w.accentColor} />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: COLORS.bg },
  scroll:          { flex: 1 },
  header:          { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  title:           { fontSize: 30, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  searchBar:       { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchInput:     { flex: 1, fontSize: 14, color: COLORS.text },
  filterRow:       { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 4, gap: 8 },
  filterChip:      { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surface },
  filterChipActive:{ backgroundColor: COLORS.accent },
  filterLabel:     { fontSize: 13, fontWeight: '500', color: COLORS.muted },
  filterLabelActive:{ color: '#000' },
  list:            { padding: 20, gap: 16 },
  card:            { backgroundColor: COLORS.surface, borderRadius: 20, overflow: 'hidden' },
  thumb:           { height: 160, alignItems: 'center', justifyContent: 'center' },
  thumbBadge:      { position: 'absolute', top: 12, left: 12 },
  cardBody:        { padding: 16, gap: 8 },
  cardTitle:       { fontSize: 16, fontWeight: '700', color: COLORS.text },
  cardMeta:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  empty:           { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText:       { fontSize: 14, color: COLORS.muted },
});
