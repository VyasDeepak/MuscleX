import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Workouts = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Chest', 'Back', 'Legs', 'Cardio', 'Yoga'];
  
  const workouts = [
    { id: 1, name: 'Barbell Bench Press', difficulty: 'Intermediate', icon: 'dumbbell' },
    { id: 2, name: 'Deadlift', difficulty: 'Advanced', icon: 'dumbbell' },
    { id: 3, name: 'Squats', difficulty: 'Intermediate', icon: 'dumbbell' },
    { id: 4, name: 'Pull-ups', difficulty: 'Advanced', icon: 'dumbbell' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <TouchableOpacity>
            <Icon name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Icon name="magnify" size={18} color="#A1A1A1" />
          <TextInput
            placeholder="Search exercises..."
            placeholderTextColor="#5A5A5C"
            style={styles.input}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Workout List */}
        <View style={styles.listContainer}>
          {workouts.map(workout => (
            <TouchableOpacity key={workout.id} style={styles.workoutItem} activeOpacity={0.8}>
              <View style={styles.itemLeft}>
                <View style={styles.exerciseIcon}>
                  <Icon name={workout.icon} size={22} color="#D0FD3E" />
                </View>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.difficulty}>{workout.difficulty}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f0f0f0',
    letterSpacing: -0.5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  input: {
    flex: 1,
    color: '#f0f0f0',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  filterScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  filterChipActive: {
    backgroundColor: '#b5f23a',
    borderColor: '#b5f23a',
  },
  filterText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#b5f23a15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f0f0f0',
    marginBottom: 4,
  },
  difficulty: {
    fontSize: 12,
    color: '#888',
  },
});

export default Workouts;
