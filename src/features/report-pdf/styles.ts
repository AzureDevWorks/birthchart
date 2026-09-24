import { StyleSheet } from '@react-pdf/renderer';

export const C = {
  ink: '#1F1409',
  inkSoft: '#4A3423',
  inkMuted: '#8B7659',
  inkFaint: '#B8A88C',
  gold: '#C9A961',
  goldDeep: '#A88947',
  goldSoft: '#E5D6AC',
  goldFaint: '#F2E9D2',
  vermilion: '#8A2B22',
  vermilionSoft: '#C9554A',
  ivory: '#FCF8EF',
  ivoryDeep: '#F6EFDD',
  ivoryDark: '#EFE6CF',
  ivoryFaint: '#FAF6EB',
  paper: '#FFFFFF',
  border: '#D9CDB0',
  borderSoft: '#EBE2CC',
  borderFaint: '#F2ECDC',
  good: '#3F6B4D',
  bad: '#8A2B22',
  warn: '#9A6F1A',
} as const;

const S = 'Times-Roman';
const SB = 'Times-Bold';
const SI = 'Times-Italic';
const SBI = 'Times-BoldItalic';
const H = 'Helvetica';
const HB = 'Helvetica-Bold';
const HO = 'Helvetica-Oblique';
const M = 'Courier';
const MB = 'Courier-Bold';

export const F = { S, SB, SI, SBI, H, HB, HO, M, MB } as const;

export const styles = StyleSheet.create({
  // ── Cover ─────────────────────────────────────────────
  coverPage: { padding: 0, backgroundColor: C.ivory, fontFamily: S, color: C.ink },
  coverFrameOuter: {
    position: 'absolute',
    top: 28, left: 28, right: 28, bottom: 28,
    borderWidth: 3, borderColor: C.gold,
    padding: 10, backgroundColor: C.ivory,
  },
  coverFrameMiddle: {
    flex: 1, borderWidth: 0.75, borderColor: C.goldDeep,
    padding: 8, backgroundColor: C.ivory,
  },
  coverFrameInner: {
    flex: 1, backgroundColor: C.ivoryDeep,
    alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 40, paddingVertical: 56,
  },
  coverGaneshWrap: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 1.5, borderColor: C.gold,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.ivory, overflow: 'hidden', marginBottom: 22,
  },
  coverGanesh: { width: 96, height: 96, objectFit: 'cover' },
  coverMantra: { fontFamily: SBI, fontSize: 12, color: C.vermilion, letterSpacing: 1.5, marginBottom: 6 },
  coverTitleSmall: { fontFamily: HB, fontSize: 9, color: C.goldDeep, letterSpacing: 6, marginBottom: 8 },
  coverRule: { width: 200, height: 0.75, backgroundColor: C.goldSoft, marginVertical: 22 },
  coverName: {
    fontFamily: SB, fontSize: 42, color: C.ink,
    letterSpacing: 1.5, textAlign: 'center', lineHeight: 1.1, marginBottom: 10,
  },
  coverNameSub: { fontFamily: HO, fontSize: 11, color: C.goldDeep, letterSpacing: 4, textAlign: 'center', marginBottom: 32 },
  coverLine: { fontFamily: S, fontSize: 12, color: C.inkSoft, textAlign: 'center', marginTop: 5, letterSpacing: 0.5 },
  coverLineMono: { fontFamily: M, fontSize: 9, color: C.inkMuted, textAlign: 'center', marginTop: 8, letterSpacing: 0.5 },
  coverFooterLabel: { fontFamily: HB, fontSize: 7.5, color: C.inkMuted, letterSpacing: 3, textAlign: 'center' },

  // ── Standard page ─────────────────────────────────────
  // Horizontal: 72pt margins → generous white space, content width = 451pt
  // Vertical: 80pt top / 72pt bottom → 690pt content height
  page: {
    paddingTop: 80, paddingBottom: 72, paddingHorizontal: 72,
    backgroundColor: C.paper, fontFamily: S,
    fontSize: 10.5, color: C.ink, lineHeight: 1.5,
  },

  // Header — pinned to the top-left and top-right corners of the page
  // (fixed means it repeats on every page)
  header: {
    position: 'absolute',
    top: 44, left: 72, right: 72,
    paddingBottom: 8,
    borderBottomWidth: 0.5, borderBottomColor: C.borderSoft,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  headerLeft: { fontFamily: SI, fontSize: 10, color: C.inkMuted },
  headerRight: { fontFamily: HB, fontSize: 8, color: C.goldDeep, letterSpacing: 3 },

  // Footer — pinned to the bottom-left and bottom-right corners
  footer: {
    position: 'absolute',
    bottom: 44, left: 72, right: 72,
    paddingTop: 8,
    borderTopWidth: 0.5, borderTopColor: C.borderSoft,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  footerLeft: { fontFamily: HB, fontSize: 7.5, color: C.inkMuted, letterSpacing: 2.5 },
  // Larger page number, distinct monospace so it reads cleanly
  footerRight: { fontFamily: MB, fontSize: 10, color: C.inkSoft, letterSpacing: 0.8 },

  // ── Section opener ────────────────────────────────────
  sectionOpener: { marginBottom: 22 },
  openerNumeral: { fontFamily: SB, fontSize: 36, color: C.goldSoft, lineHeight: 1, marginBottom: 2 },
  openerTitle: { fontFamily: SB, fontSize: 24, color: C.ink, lineHeight: 1.15, marginBottom: 4 },
  openerEyebrow: { fontFamily: HB, fontSize: 8, color: C.goldDeep, letterSpacing: 3, marginBottom: 4 },
  openerHint: { fontFamily: SI, fontSize: 9.5, color: C.inkMuted, lineHeight: 1.45, maxWidth: 400 },
  openerRule: { height: 0.75, backgroundColor: C.gold, width: 60, marginTop: 12, marginBottom: 18 },

  // ── Typography ────────────────────────────────────────
  h1: { fontFamily: SB, fontSize: 20, color: C.ink, marginBottom: 6 },
  h2: { fontFamily: SB, fontSize: 14, color: C.ink, marginTop: 10, marginBottom: 4 },
  h3: { fontFamily: HB, fontSize: 8.5, color: C.goldDeep, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8 },
  body: { fontFamily: S, fontSize: 10.5, color: C.ink, lineHeight: 1.55, marginBottom: 6 },
  bodyLg: { fontFamily: S, fontSize: 11.5, color: C.ink, lineHeight: 1.55, marginBottom: 8 },
  muted: { fontFamily: SI, fontSize: 9.5, color: C.inkMuted, marginBottom: 4 },
  mono: { fontFamily: M, fontSize: 9, color: C.inkSoft },

  // ── TOC ───────────────────────────────────────────────
  tocPage: {
    paddingTop: 100, paddingBottom: 80, paddingHorizontal: 80,
    backgroundColor: C.paper, fontFamily: S, color: C.ink,
  },
  tocEyebrow: { fontFamily: HB, fontSize: 8, color: C.goldDeep, letterSpacing: 4, marginBottom: 8, textAlign: 'center' },
  tocTitle: { fontFamily: SB, fontSize: 32, color: C.ink, textAlign: 'center', marginBottom: 6, letterSpacing: 0.5 },
  tocRule: { height: 0.75, width: 80, backgroundColor: C.gold, marginTop: 14, marginBottom: 44, alignSelf: 'center' },
  tocRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    marginBottom: 16, paddingBottom: 5,
    borderBottomWidth: 0.5, borderBottomColor: C.borderFaint,
  },
  tocNumeral: { fontFamily: SB, fontSize: 11, color: C.goldDeep, width: 44, marginBottom: 1 },
  tocLabel: { fontFamily: S, fontSize: 12.5, color: C.ink, flex: 1 },
  tocDots: { fontFamily: M, fontSize: 9, color: C.inkFaint, marginHorizontal: 8, marginBottom: 2 },
  tocPageNum: { fontFamily: M, fontSize: 10.5, color: C.inkSoft, marginBottom: 1 },

  // ── Cards ─────────────────────────────────────────────
  card: { borderWidth: 0.75, borderColor: C.border, borderRadius: 6, padding: 16, backgroundColor: C.paper, marginBottom: 14 },
  cardSoft: { borderWidth: 0.75, borderColor: C.borderSoft, borderRadius: 6, padding: 16, backgroundColor: C.ivory, marginBottom: 14 },
  cardAccent: { borderWidth: 0.75, borderColor: C.gold, borderRadius: 6, padding: 18, backgroundColor: C.ivoryDeep, marginBottom: 14 },

  // ── Tables ────────────────────────────────────────────
  table: { borderWidth: 0.75, borderColor: C.border, borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  tr: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.borderSoft, minHeight: 26, alignItems: 'center' },
  trLast: { flexDirection: 'row', minHeight: 26, alignItems: 'center' },
  trAlt: { backgroundColor: C.ivoryFaint },
  th: {
    backgroundColor: C.ivoryDeep, fontFamily: HB, fontSize: 7.5, color: C.inkSoft,
    letterSpacing: 1.5, textTransform: 'uppercase',
    paddingVertical: 9, paddingHorizontal: 11,
    borderBottomWidth: 0.75, borderBottomColor: C.border,
  },
  td: { fontFamily: S, fontSize: 10, color: C.ink, paddingVertical: 7, paddingHorizontal: 11 },
  tdMono: { fontFamily: M, fontSize: 9, color: C.inkSoft, paddingVertical: 7, paddingHorizontal: 11 },
  tdLabel: { fontFamily: SB, fontSize: 10, color: C.ink, paddingVertical: 7, paddingHorizontal: 11 },

  // ── Anchor cards ──────────────────────────────────────
  anchorRow: { flexDirection: 'row', gap: 14, marginBottom: 26 },
  anchorCard: {
    flex: 1, borderWidth: 0.75, borderColor: C.border,
    borderRadius: 8, padding: 16, backgroundColor: C.ivory,
  },
  anchorRole: { fontFamily: HB, fontSize: 7.5, color: C.goldDeep, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 3 },
  anchorSub: { fontFamily: SI, fontSize: 9.5, color: C.inkMuted, marginBottom: 14 },
  anchorRashi: { fontFamily: SB, fontSize: 22, color: C.ink, lineHeight: 1.1, marginBottom: 5 },
  anchorDegree: { fontFamily: M, fontSize: 9.5, color: C.inkSoft, marginBottom: 12 },
  anchorRule: { height: 0.5, backgroundColor: C.goldSoft, marginBottom: 12 },
  anchorField: { fontFamily: S, fontSize: 9.5, color: C.inkSoft, marginTop: 4 },
  anchorFieldLabel: { color: C.inkMuted, fontFamily: SI },

  // ── Chart ─────────────────────────────────────────────
  chartFull: { alignItems: 'center', marginVertical: 10 },
  chartGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  chartCell: { width: '48%', alignItems: 'center', marginBottom: 16 },
  chartCellTitle: { fontFamily: HB, fontSize: 8.5, color: C.goldDeep, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 },
  chartCellSub: { fontFamily: SI, fontSize: 9, color: C.inkMuted, marginTop: 8 },

  // ── Dasha ─────────────────────────────────────────────
  dashaHero: {
    borderWidth: 1, borderColor: C.gold,
    borderRadius: 8, padding: 26, backgroundColor: C.ivoryDeep,
    alignItems: 'center', marginBottom: 24,
  },
  dashaEyebrow: { fontFamily: HB, fontSize: 7.5, color: C.goldDeep, letterSpacing: 3.5, marginBottom: 10 },
  dashaPlanet: { fontFamily: SB, fontSize: 32, color: C.ink, lineHeight: 1.1, marginBottom: 5, letterSpacing: 1 },
  dashaDates: { fontFamily: M, fontSize: 9.5, color: C.inkSoft, marginBottom: 20, letterSpacing: 0.5 },
  dashaBarOuter: { width: 320, height: 5, backgroundColor: C.borderSoft, borderRadius: 3, marginBottom: 7 },
  dashaBarInner: { height: 5, backgroundColor: C.goldDeep, borderRadius: 3 },
  dashaPct: { fontFamily: HB, fontSize: 8, color: C.inkMuted, letterSpacing: 2 },
  dashaSubRow: { flexDirection: 'row', gap: 24, marginTop: 10 },
  dashaInlineRow: {
    flexDirection: 'row', gap: 24,
    paddingVertical: 14, paddingHorizontal: 18,
    borderWidth: 0.75, borderColor: C.borderSoft, borderRadius: 6,
    backgroundColor: C.ivory, marginBottom: 16,
  },
  dashaSubLabel: { fontFamily: HB, fontSize: 7, color: C.goldDeep, letterSpacing: 2.5, marginBottom: 5 },
  dashaSubValue: { fontFamily: SB, fontSize: 13, color: C.ink, marginBottom: 2 },
  dashaSubDates: { fontFamily: M, fontSize: 8.5, color: C.inkMuted },

  // ── Bindu grid ────────────────────────────────────────
  binduGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 18 },
  binduCell: {
    width: '15.5%', aspectRatio: 1,
    borderWidth: 0.5, borderColor: C.borderSoft,
    borderRadius: 4, padding: 8,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  binduHouse: { fontFamily: HB, fontSize: 8, color: C.inkMuted, letterSpacing: 1.5, marginBottom: 3 },
  binduNumber: { fontFamily: SB, fontSize: 20, lineHeight: 1, marginBottom: 3 },
  binduStrength: { fontFamily: HB, fontSize: 6.5, letterSpacing: 1.5, textTransform: 'uppercase' },

  // ── Reading ───────────────────────────────────────────
  readingMeta: {
    flexDirection: 'row', gap: 18, marginBottom: 20, paddingBottom: 12,
    borderBottomWidth: 0.5, borderBottomColor: C.borderSoft,
  },
  readingMetaItem: { fontFamily: HB, fontSize: 7.5, color: C.inkMuted, letterSpacing: 2 },
  readingFirst: { fontFamily: S, fontSize: 11, color: C.ink, lineHeight: 1.65, marginBottom: 11, textAlign: 'justify' },
  readingBody: { fontFamily: S, fontSize: 11, color: C.ink, lineHeight: 1.65, marginBottom: 11, textAlign: 'justify' },

  // ── Colophon ──────────────────────────────────────────
  colophonPage: {
    paddingTop: 220, paddingBottom: 100, paddingHorizontal: 100,
    backgroundColor: C.ivory, fontFamily: S, color: C.ink, alignItems: 'center',
  },
  colophonRule: { height: 0.75, width: 120, backgroundColor: C.gold, marginVertical: 26, alignSelf: 'center' },
  colophonMain: { fontFamily: SB, fontSize: 24, color: C.ink, textAlign: 'center', lineHeight: 1.3, marginBottom: 14 },
  colophonSub: { fontFamily: SI, fontSize: 11.5, color: C.inkSoft, textAlign: 'center', lineHeight: 1.65, marginBottom: 26 },
  colophonMeta: { fontFamily: M, fontSize: 8.5, color: C.inkMuted, textAlign: 'center', lineHeight: 1.9, letterSpacing: 0.5 },

  // ── Helpers ───────────────────────────────────────────
  row: { flexDirection: 'row' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  center: { alignItems: 'center', justifyContent: 'center' },
  between: { justifyContent: 'space-between' },
  gap8: { gap: 8 },
  gap12: { gap: 12 },
  gap16: { gap: 16 },
  gap20: { gap: 20 },
  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
});