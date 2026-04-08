import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
});
import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

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
  primary: { color: colors.primary },
  secondaryText: { color: colors.secondaryText },
});

export default styles;
