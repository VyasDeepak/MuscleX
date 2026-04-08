import { StyleSheet } from 'react-native';

// ─── Design Tokens (Matching HTML Mockup) ─────────────────────────
const BG        = '#0f0f0f';    // Very dark background
const SURFACE   = '#1a1a1a';    // Dark surface
const CARD      = '#1a1a1a';    // Card background
const BORDER    = '#2e2e2e';    // Dark border
const TEXT      = '#f0f0f0';    // Off-white text
const MUTED     = '#888';       // Muted grey
const PRIMARY   = '#b5f23a';    // Lime green (FITFLOW accent)
const ACCENT2   = '#7ee8a2';    // Secondary green
const ACCENT3   = '#f2a23a';    // Orange accent

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // ── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  menuBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: PRIMARY,
    letterSpacing: 2,
  },
  bellBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY,
  },

  // ── Greeting ─────────────────────────────────────────────────────
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT,
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // ── Daily Progress Card ──────────────────────────────────────────
  dailyProgressCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  progressCardLeft: {
    flexDirection: 'row',
    gap: 24,
  },
  progressTextSection: {
    justifyContent: 'center',
  },
  progressLabel: {
    fontSize: 11,
    color: MUTED,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT,
  },
  progressRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringEmoji: {
    fontSize: 36,
  },

  // ── Section Container ───────────────────────────────────────────
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: PRIMARY,
  },

  // ── Today's Plan Cards ──────────────────────────────────────────
  planScrollContent: {
    gap: 12,
    paddingRight: 20,
  },
  planCard: {
    width: 150,
    height: 170,
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  planCardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 12,
    justifyContent: 'flex-end',
    minHeight: 100,
  },
  planIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT,
    lineHeight: 16,
    marginBottom: 6,
  },
  planDuration: {
    fontSize: 11,
    color: MUTED,
    fontWeight: '500',
  },

  // ── Routines Section ────────────────────────────────────────────
  routinesScrollContent: {
    gap: 12,
    paddingRight: 20,
  },
  routineCard: {
    width: 160,
    backgroundColor: SURFACE,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routineThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  routineContent: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT,
    marginBottom: 3,
  },
  routineDescription: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 13,
  },
  routineMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  routineMetaText: {
    fontSize: 11,
    color: MUTED,
    fontWeight: '500',
  },
  routineCaloriesPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  routineCaloriesText: {
    fontSize: 10,
    fontWeight: '600',
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
    shadowColor: '#cccccc',
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

  // ── Card ──────────────────────────────────────────────────────
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  // ── Routine Section ─────────────────────────────────────────────
  routineScrollContent: {
    paddingRight: 20,
    gap: 12,
    marginBottom: 32,
  },
  routineCardOld: {
    width: 140,
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BORDER,
  },
  routineTitleOld: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  routineDurationOld: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 8,
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
  workoutImagePlaceholder: {
    height: 120,
    backgroundColor: SURFACE,
    borderTopWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutEmoji: {
    fontSize: 48,
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
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '500',
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
    color: '#D0FD3E',
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

  // ── Streak Banner ────────────────────────────────────────────────
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D0FD3E15',
    borderWidth: 1,
    borderColor: '#D0FD3E35',
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
    color: '#D0FD3E',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  streakSub: {
    color: '#D0FD3E99',
    fontSize: 12,
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#D0FD3E25',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakBadgeText: {
    color: '#D0FD3E',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // ── Header (old) ─────────────────────────────────────────────────
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
  userName: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});

export default styles;
