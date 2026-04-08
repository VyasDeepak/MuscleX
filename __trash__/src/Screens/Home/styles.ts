import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
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
