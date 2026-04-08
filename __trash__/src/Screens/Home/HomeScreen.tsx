import React from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

const categories = [
  { key: 'Cardio', icon: 'heart-pulse' },
  { key: 'Strength', icon: 'dumbbell' },
  { key: 'Endurance', icon: 'run' },
  { key: 'More', icon: 'dots-horizontal' },
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good morning!{"\n"}William Anderson</Text>
      <View style={styles.tabRow}>
        <Text style={styles.tabActive}>Discover</Text>
        <Text style={styles.tab}>Trainers</Text>
        <Text style={styles.tab}>My workouts</Text>
      </View>
      <View style={styles.searchBox}>
        <Icon name="magnify" size={22} color="#A1A1AA" />
        <TextInput placeholder="Search" placeholderTextColor="#A1A1AA" style={styles.input} />
      </View>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <View key={cat.key} style={styles.categoryItem}>
            <View style={styles.categoryIconWrap}>
              <Icon name={cat.icon} size={26} color="#7F56D9" />
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
      </ScrollView>
      <Text style={styles.sectionTitle}>Quick workouts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.workoutCardSmall}>
          <Text style={styles.freeTag}>Free</Text>
          <Text style={styles.workoutTitleSmall}>Quick Cardio</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;
