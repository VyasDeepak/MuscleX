import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../theme/colors';

const WorkoutCard = ({ title, trainer, image, premium, rating }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.img} />
    {premium && <View style={styles.premiumTag}><Text style={styles.premiumText}>Premium</Text></View>}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.trainer}>{trainer}</Text>
    <View style={styles.ratingRow}>
      <Text style={styles.rating}>{rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: colors.card,
    borderRadius: 18,
    marginRight: 16,
    padding: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  premiumTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  premiumText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
  },
  trainer: {
    color: colors.secondaryText,
    fontSize: 13,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: colors.text,
    marginLeft: 4,
    fontSize: 13,
  },
});

export default WorkoutCard;
