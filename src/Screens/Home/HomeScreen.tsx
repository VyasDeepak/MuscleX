import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '../../theme/colors';

const categories = [
  { key: 'Cardio', icon: 'heart-pulse', color: colors.cardio },
  { key: 'Strength', icon: 'dumbbell', color: colors.strength },
  { key: 'Endurance', icon: 'tornado', color: colors.endurance },
  { key: 'More', icon: 'dots-grid', color: colors.more },
];

const exclusiveWorkouts = [
  { id: 1, title: 'Cardio training sets', trainer: 'Robert Fox', rating: 4.8, badge: 'Premium' },
  { id: 2, title: 'Strength training', trainer: 'Jane Smith', rating: 4.9, badge: 'Premium' },
];

const quickWorkouts = [
  { id: 1, duration: '15 min', title: 'Morning Cardio' },
  { id: 2, duration: '20 min', title: 'Core Strength' },
];

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Discover');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.userName}>William Anderson</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellIcon}>
            <Icon name="bell-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {['Discover', 'Trainers', 'My workouts'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
                activeTab === tab && styles.tabUnderline,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={20} color={colors.secondaryText} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.secondaryText}
          style={styles.input}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <TouchableOpacity key={cat.key} style={styles.categoryItem}>
            <View style={[styles.categoryIconWrap, { backgroundColor: cat.color }]}>
              <Icon name={cat.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.categoryText}>{cat.key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exclusive Workout Sets */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Exclusive workout sets</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.workoutScroll}
        contentContainerStyle={styles.workoutContainer}
      >
        {exclusiveWorkouts.map(workout => (
          <TouchableOpacity key={workout.id} style={styles.workoutCard}>
            <View style={styles.cardImage}>
              <Text style={styles.badge}>{workout.badge}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.trainerName}>{workout.trainer}</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={14} color="#FFB800" solid />
                <Text style={styles.rating}>{workout.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Workouts */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick workouts</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <View style={styles.quickWorkoutsContainer}>
        {quickWorkouts.map(workout => (
          <TouchableOpacity key={workout.id} style={styles.quickWorkoutItem}>
            <View style={styles.quickWorkoutBadge}>
              <Text style={styles.quickWorkoutDuration}>{workout.duration}</Text>
            </View>
            <Text style={styles.quickWorkoutTitle}>{workout.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default HomeScreen;
