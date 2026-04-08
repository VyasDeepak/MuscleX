import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';

const categories = [
  { key: 'Cardio', icon: 'heart-pulse' },
  { key: 'Strength', icon: 'dumbbell' },
  { key: 'Endurance', icon: 'run' },
  { key: 'More', icon: 'dots-horizontal' },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good morning!{"\n"}William Anderson</Text>
      <View style={styles.tabRow}>
        <Text style={styles.tabActive}>Discover</Text>
        <Text style={styles.tab}>Trainers</Text>
        <Text style={styles.tab}>My workouts</Text>
      </View>
      <View style={styles.searchBox}>
        <Icon name="magnify" size={22} color={colors.secondaryText} />
        <TextInput placeholder="Search" placeholderTextColor={colors.secondaryText} style={styles.input} />
      </View>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <View key={cat.key} style={styles.categoryItem}>
            <View style={styles.categoryIconWrap}>
              <Icon name={cat.icon} size={26} color={colors.primary} />
            </View>
            <Text style={styles.categoryText}>{cat.key}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Exclusive workout sets</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <View style={styles.workoutCard}>
          <Image source={require('../../assets/images/cardio.jpg')} style={styles.workoutImg} />
          <View style={styles.premiumTag}><Text style={styles.premiumText}>Premium</Text></View>
          <Text style={styles.workoutTitle}>Cardio training sets</Text>
          <Text style={styles.trainer}>Robert Fox</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={16} color="#F4D35E" />
            <Text style={styles.rating}>4.8</Text>
          </View>
        </View>
        {/* Add more cards as needed */}
      </ScrollView>
      <Text style={styles.sectionTitle}>Quick workouts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.workoutCardSmall}>
          <Text style={styles.freeTag}>Free</Text>
          <Text style={styles.workoutTitleSmall}>Quick Cardio</Text>
        </View>
        {/* Add more cards as needed */}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  greeting: { color: colors.text, fontSize: 22, fontWeight: 'bold', marginBottom: 18 },
  tabRow: { flexDirection: 'row', marginBottom: 18 },
  tabActive: { color: colors.primary, fontWeight: 'bold', marginRight: 24, fontSize: 16 },
  tab: { color: colors.secondaryText, marginRight: 24, fontSize: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 16, marginBottom: 18 },
  input: { flex: 1, color: colors.text, marginLeft: 8, fontSize: 16 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  categoryItem: { alignItems: 'center' },
  categoryIconWrap: { backgroundColor: colors.card, borderRadius: 16, padding: 12, marginBottom: 6 },
  categoryText: { color: colors.text, fontSize: 13 },
  sectionTitle: { color: colors.text, fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  workoutCard: { width: 180, backgroundColor: colors.card, borderRadius: 18, marginRight: 16, padding: 12, overflow: 'hidden' },
  workoutImg: { width: '100%', height: 90, borderRadius: 12, marginBottom: 8 },
  premiumTag: { position: 'absolute', top: 12, left: 12, backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  premiumText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  workoutTitle: { color: colors.text, fontWeight: 'bold', fontSize: 15, marginTop: 8 },
  trainer: { color: colors.secondaryText, fontSize: 13, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { color: colors.text, marginLeft: 4, fontSize: 13 },
  workoutCardSmall: { width: 120, backgroundColor: colors.card, borderRadius: 14, marginRight: 12, padding: 12, alignItems: 'center' },
  freeTag: { color: colors.primary, fontWeight: 'bold', fontSize: 12, marginBottom: 8 },
  workoutTitleSmall: { color: colors.text, fontWeight: 'bold', fontSize: 14 },
});

export default HomeScreen;
