import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface ExerciseDetailsScreenProps {
  route?: any;
  navigation?: any;
}

const ExerciseDetailsScreen: React.FC<ExerciseDetailsScreenProps> = ({ navigation }) => {
  const exercise = {
    title: 'LEG DAY BASH',
    duration: '33 min',
    difficulty: 'Advanced',
    cals: '340 kcal',
    image: '🏋️',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    targetMuscle: 'Quadriceps',
    equipment: 'Barbell',
    estCalories: '340 kcal',
    exercises: [
      { id: 1, name: 'Squats', sets: 4, reps: '8', cals: '50 cals' },
      { id: 2, name: 'Lunges', sets: 3, reps: '12', cals: '35 cals' },
      { id: 3, name: 'Leg Press', sets: 4, reps: '10', cals: '45 cals' },
      { id: 4, name: 'Leg Curls', sets: 3, reps: '15', cals: '30 cals' },
      { id: 5, name: 'Calf Raises', sets: 3, reps: '20', cals: '25 cals' },
    ],
    instructions: [
      'Keep your chest upright and core engaged',
      'Lower your body by bending your knees',
      'Go down until your thighs are parallel to the floor',
      'Push through your heels to return to start position',
      'Maintain proper form throughout all sets',
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Image */}
        <View style={styles.heroImage}>
          <Text style={styles.heroEmoji}>{exercise.image}</Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{exercise.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="clock" size={16} color="#A1A1A1" />
              <Text style={styles.metaText}>{exercise.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="fire" size={16} color="#D0FD3E" />
              <Text style={[styles.metaText, { color: '#D0FD3E' }]}>{exercise.cals}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="dumbbell" size={16} color="#4ECDC4" />
              <Text style={styles.metaText}>{exercise.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Target Muscle</Text>
            <Text style={styles.statValue}>{exercise.targetMuscle}</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxCenter]}>
            <Text style={styles.statLabel}>Equipment</Text>
            <Text style={styles.statValue}>{exercise.equipment}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Est. Calories</Text>
            <Text style={styles.statValue}>{exercise.estCalories}</Text>
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {exercise.exercises.map(ex => (
            <View key={ex.id} style={styles.exerciseItem}>
              <View style={styles.exerciseLeft}>
                <View style={styles.exerciseNumber}>
                  <Text style={styles.exerciseNumberText}>{ex.id}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.exerciseDetail}>{ex.sets} sets • {ex.reps} reps</Text>
                </View>
              </View>
              <Text style={styles.calorieText}>{ex.cals}</Text>
            </View>
          ))}
        </View>

        {/* Instructions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {exercise.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.startButton}>
          <Icon name="play-circle" size={20} color="#1C1C1E" />
          <Text style={styles.startButtonText}>Start Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  heroImage: {
    height: 240,
    backgroundColor: '#1e2a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  heroEmoji: {
    fontSize: 80,
  },
  titleSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f0f0f0',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  metaText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    alignItems: 'center',
  },
  statBoxCenter: {
    borderLeftColor: '#b5f23a',
    borderLeftWidth: 2,
  },
  statLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  statValue: {
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f0f0f0',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#b5f23a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetail: {
    color: '#888',
    fontSize: 12,
  },
  calorieText: {
    color: '#b5f23a',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    marginTop: 2,
  },
  instructionNumberText: {
    color: '#b5f23a',
    fontSize: 12,
    fontWeight: '700',
  },
  instructionText: {
    color: '#888',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#0f0f0f',
    borderTopWidth: 1,
    borderTopColor: '#2e2e2e',
  },
  startButton: {
    backgroundColor: '#b5f23a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  startButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ExerciseDetailsScreen;
