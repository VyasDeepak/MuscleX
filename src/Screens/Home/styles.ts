import { StyleSheet } from 'react-native';

// ─── Design Tokens ────────────────────────────────────────────────
const BG        = '#0A0A0F';
const SURFACE   = '#13131A';
const CARD      = '#1A1A24';
const BORDER    = '#ffffff0f';
const TEXT      = '#F0F0F5';
const MUTED     = '#6B6B80';
const PRIMARY   = '#FF6B6B';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // ── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: MUTED,
    fontSize: 13,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  userName: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnAccent: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: PRIMARY,
    borderWidth: 1.5,
    borderColor: BG,
  },

  // ── Streak Banner ────────────────────────────────────────────────
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFB80015',
    borderWidth: 1,
    borderColor: '#FFB80035',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakEmoji: {
    fontSize: 24,
  },
  streakTitle: {
    color: '#FFB800',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  streakSub: {
    color: '#FFB80099',
    fontSize: 12,
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#FFB80025',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakBadgeText: {
    color: '#FFB800',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // ── Tabs ─────────────────────────────────────────────────────────
  tabRow: {
    flexDirection: 'row',
    backgroundColor: SURFACE,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 11,
  },
  tabBtnActive: {
    backgroundColor: CARD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: TEXT,
    fontWeight: '700',
  },

  // ── Search ───────────────────────────────────────────────────────
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 28,
    gap: 10,
  },
  input: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Categories ───────────────────────────────────────────────────
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  categoryIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff0a',
  },
  categoryText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // ── Section Header ────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  seeAll: {
    color: PRIMARY,
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Exclusive Workout Cards ──────────────────────────────────────
  workoutScrollContent: {
    paddingRight: 20,
    gap: 12,
    marginBottom: 32,
  },
  workoutCard: {
    width: 170,
    backgroundColor: CARD,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardAccentBar: {
    height: 4,
    width: '100%',
  },
  cardBody: {
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardSessions: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '500',
  },
  workoutTitle: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trainerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trainerInitial: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  trainerName: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    color: '#FFB800',
    fontSize: 11,
    fontWeight: '700',
  },

  // ── Quick Workouts ────────────────────────────────────────────────
  quickList: {
    gap: 10,
  },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    gap: 14,
  },
  quickIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickText: {
    flex: 1,
    gap: 3,
  },
  quickTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  quickDuration: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
  },
  quickArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
