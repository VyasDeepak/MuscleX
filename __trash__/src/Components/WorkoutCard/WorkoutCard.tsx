import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { Workout } from '../../modals/workout';

interface WorkoutCardProps {
  workout: Workout;
  trainer: string;
  image: any;
  premium?: boolean;
  rating?: number;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, trainer, image, premium, rating }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.img} />
    {premium && <View style={styles.premiumTag}><Text style={styles.premiumText}>Premium</Text></View>}
    <Text style={styles.title}>{workout.title}</Text>
    <Text style={styles.trainer}>{trainer}</Text>
    {rating && (
      <View style={styles.ratingRow}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    )}
  </View>
);

export default WorkoutCard;
