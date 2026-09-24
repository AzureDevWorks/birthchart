import type { Accent } from './categories';

export interface AccentStyle {
  accent: string;
  border: string;
  borderSoft: string;
  hairline: string;
  cardBg: string;
  articleBg: string;
  ornament: string;
}

export const ACCENT_STYLES: Record<Accent, AccentStyle> = {
  amber:   { accent: 'hsl(38 55% 42%)',   border: 'hsl(38 55% 42% / 0.25)',   borderSoft: 'hsl(38 55% 42% / 0.12)',   hairline: 'linear-gradient(90deg, hsl(38 65% 55%), hsl(38 55% 42%))',   cardBg: 'linear-gradient(180deg, hsl(38 55% 98%), hsl(38 45% 96%))',   articleBg: 'linear-gradient(180deg, #FBF6EA 0%, #F5EEDF 100%)', ornament: 'hsl(38 55% 48%)' },
  rose:    { accent: 'hsl(346 65% 45%)',  border: 'hsl(346 65% 45% / 0.25)',  borderSoft: 'hsl(346 65% 45% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(346 70% 62%), hsl(346 65% 45%))',  cardBg: 'linear-gradient(180deg, hsl(346 60% 98%), hsl(346 45% 96%))',  articleBg: 'linear-gradient(180deg, #FDF5F6 0%, #F9E9EC 100%)', ornament: 'hsl(346 65% 50%)' },
  violet:  { accent: 'hsl(262 55% 50%)',  border: 'hsl(262 55% 50% / 0.25)',  borderSoft: 'hsl(262 55% 50% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(262 60% 66%), hsl(262 55% 50%))',  cardBg: 'linear-gradient(180deg, hsl(262 50% 98%), hsl(262 40% 96%))',  articleBg: 'linear-gradient(180deg, #F7F5FD 0%, #EEEAF9 100%)', ornament: 'hsl(262 55% 54%)' },
  emerald: { accent: 'hsl(150 50% 34%)',  border: 'hsl(150 50% 34% / 0.25)',  borderSoft: 'hsl(150 50% 34% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(150 50% 50%), hsl(150 50% 34%))',  cardBg: 'linear-gradient(180deg, hsl(150 40% 98%), hsl(150 30% 96%))',  articleBg: 'linear-gradient(180deg, #F1FAF5 0%, #E4F3EA 100%)', ornament: 'hsl(150 50% 40%)' },
  sky:     { accent: 'hsl(200 70% 40%)',  border: 'hsl(200 70% 40% / 0.25)',  borderSoft: 'hsl(200 70% 40% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(200 75% 55%), hsl(200 70% 40%))',  cardBg: 'linear-gradient(180deg, hsl(200 55% 98%), hsl(200 40% 96%))',  articleBg: 'linear-gradient(180deg, #F2F8FC 0%, #E5F0F8 100%)', ornament: 'hsl(200 70% 46%)' },
  slate:   { accent: 'hsl(215 25% 34%)',  border: 'hsl(215 25% 34% / 0.25)',  borderSoft: 'hsl(215 25% 34% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(215 25% 55%), hsl(215 25% 34%))',  cardBg: 'linear-gradient(180deg, hsl(215 20% 98%), hsl(215 15% 96%))',  articleBg: 'linear-gradient(180deg, #F4F6F9 0%, #E8ECF1 100%)', ornament: 'hsl(215 25% 40%)' },
  crimson: { accent: 'hsl(6 60% 40%)',    border: 'hsl(6 60% 40% / 0.25)',    borderSoft: 'hsl(6 60% 40% / 0.12)',    hairline: 'linear-gradient(90deg, hsl(6 65% 58%), hsl(6 60% 40%))',    cardBg: 'linear-gradient(180deg, hsl(6 55% 98%), hsl(6 40% 96%))',    articleBg: 'linear-gradient(180deg, #FCF4F2 0%, #F7E7E4 100%)', ornament: 'hsl(6 60% 42%)' },
  indigo:  { accent: 'hsl(245 55% 48%)',  border: 'hsl(245 55% 48% / 0.25)',  borderSoft: 'hsl(245 55% 48% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(245 60% 62%), hsl(245 55% 48%))',  cardBg: 'linear-gradient(180deg, hsl(245 50% 98%), hsl(245 40% 96%))',  articleBg: 'linear-gradient(180deg, #F3F4FC 0%, #E8EAF7 100%)', ornament: 'hsl(245 55% 52%)' },
  teal:    { accent: 'hsl(180 55% 32%)',  border: 'hsl(180 55% 32% / 0.25)',  borderSoft: 'hsl(180 55% 32% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(180 55% 48%), hsl(180 55% 32%))',  cardBg: 'linear-gradient(180deg, hsl(180 40% 98%), hsl(180 30% 96%))',  articleBg: 'linear-gradient(180deg, #F0F9F8 0%, #E1F1EF 100%)', ornament: 'hsl(180 55% 38%)' },
  sunset:  { accent: 'hsl(20 75% 45%)',   border: 'hsl(20 75% 45% / 0.25)',   borderSoft: 'hsl(20 75% 45% / 0.12)',   hairline: 'linear-gradient(90deg, hsl(20 80% 60%), hsl(20 75% 45%))',   cardBg: 'linear-gradient(180deg, hsl(20 70% 98%), hsl(20 55% 96%))',   articleBg: 'linear-gradient(180deg, #FDF6F0 0%, #F9EBE0 100%)', ornament: 'hsl(20 75% 50%)' },
};