import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

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
        <Icon name="magnify" size={22} color={styles.secondaryText.color} />
        <TextInput placeholder="Search" placeholderTextColor={styles.secondaryText.color} style={styles.input} />
      </View>
      <View style={styles.categoryRow}>
        {categories.map(cat => (
          <View key={cat.key} style={styles.categoryItem}>
            <View style={styles.categoryIconWrap}>
              <Icon name={cat.icon} size={26} color={styles.primary.color} />
            </View>
            <Text style={styles.categoryText}>{cat.key}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
