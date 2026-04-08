import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const categories = [
  { key: 'Cardio',    icon: 'heart-pulse',   color: '#FF6B6B' },
  { key: 'Strength',  icon: 'dumbbell',      color: '#4ECDC4' },
  { key: 'Endurance', icon: 'lightning-bolt', color: '#FFB800' },
  { key: 'More',      icon: 'dots-grid',     color: '#A78BFA' },
];

const exclusiveWorkouts = [
  { id: 1, title: 'Cardio\nTraining Sets', trainer: 'Robert Fox',  rating: 4.8, badge: 'Premium', sessions: '12 sessions', accent: '#FF6B6B' },
  { id: 2, title: 'Strength\nTraining',    trainer: 'Jane Smith',  rating: 4.9, badge: 'Pro',     sessions: '8 sessions',  accent: '#4ECDC4' },
  { id: 3, title: 'HIIT\nChallenge',       trainer: 'Mike Torres', rating: 4.7, badge: 'New',     sessions: '10 sessions', accent: '#FFB800' },
];

const quickWorkouts = [
  { id: 1, duration: '15 min', title: 'Morning Cardio', icon: 'run-fast', color: '#FF6B6B' },
  { id: 2, duration: '20 min', title: 'Core Strength',  icon: 'arm-flex', color: '#4ECDC4' },
  { id: 3, duration: '10 min', title: 'Stretch & Flow', icon: 'yoga',     color: '#A78BFA' },
];

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Discover');
  const tabs = ['Discover', 'Trainers', 'My Workouts'];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 🔥</Text>
            <Text style={styles.userName}>William Anderson</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Icon name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, styles.iconBtnAccent]}>
              <Icon name="bell-outline" size={20} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak Banner */}
        <View style={styles.streakBanner}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakEmoji}>⚡</Text>
            <View>
              <Text style={styles.streakTitle}>7-Day Streak!</Text>
              <Text style={styles.streakSub}>Keep pushing — you're on fire</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>VIEW</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Icon name="magnify" size={18} color="#555" />
          <TextInput
            placeholder="Search workouts, trainers..."
            placeholderTextColor="#555"
            style={styles.input}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="tune-variant" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity key={cat.key} style={styles.categoryItem}>
              <View style={[styles.categoryIconWrap, { backgroundColor: cat.color + '22' }]}>
                <Icon name={cat.icon} size={22} color={cat.color} />
              </View>
              <Text style={styles.categoryText}>{cat.key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Exclusive Sets */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Sets</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.workoutScrollContent}
        >
          {exclusiveWorkouts.map(workout => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard} activeOpacity={0.85}>
              <View style={[styles.cardAccentBar, { backgroundColor: workout.accent }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <View style={[styles.badge, { backgroundColor: workout.accent + '22' }]}>
                    <Text style={[styles.badgeText, { color: workout.accent }]}>{workout.badge}</Text>
                  </View>
                  <Text style={styles.cardSessions}>{workout.sessions}</Text>
                </View>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.trainerRow}>
                    <View style={[styles.trainerAvatar, { backgroundColor: workout.accent }]}>
                      <Text style={styles.trainerInitial}>{workout.trainer.charAt(0)}</Text>
                    </View>
                    <Text style={styles.trainerName}>{workout.trainer}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Icon name="star" size={12} color="#FFB800" />
                    <Text style={styles.rating}>{workout.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Workouts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Workouts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickList}>
          {quickWorkouts.map(workout => (
            <TouchableOpacity key={workout.id} style={styles.quickItem} activeOpacity={0.8}>
              <View style={[styles.quickIconWrap, { backgroundColor: workout.color + '22' }]}>
                <Icon name={workout.icon} size={22} color={workout.color} />
              </View>
              <View style={styles.quickText}>
                <Text style={styles.quickTitle}>{workout.title}</Text>
                <Text style={styles.quickDuration}>{workout.duration}</Text>
              </View>
              <View style={[styles.quickArrow, { backgroundColor: workout.color + '22' }]}>
                <Icon name="chevron-right" size={18} color={workout.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
