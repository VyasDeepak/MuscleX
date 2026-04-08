import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: colors.secondaryText,
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellIcon: {
    marginLeft: 8,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    color: colors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 24,
    paddingBottom: 12,
  },
  tabActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  tabUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    color: colors.text,
    marginLeft: 8,
    fontSize: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryIconWrap: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  workoutScroll: {
    marginBottom: 32,
  },
  workoutContainer: {
    paddingRight: 20,
    gap: 12,
  },
  workoutCard: {
    width: 160,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    height: 100,
    backgroundColor: colors.border,
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingLeft: 8,
  },
  badge: {
    backgroundColor: '#FFB800',
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  cardContent: {
    padding: 12,
  },
  workoutTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trainerName: {
    color: colors.secondaryText,
    fontSize: 12,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: colors.secondaryText,
    fontSize: 12,
  },
  quickWorkoutsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickWorkoutItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
  },
  quickWorkoutBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  quickWorkoutDuration: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  quickWorkoutTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default styles;
