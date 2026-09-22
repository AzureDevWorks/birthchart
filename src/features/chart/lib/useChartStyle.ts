import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChartStyle } from '../types';

interface ChartStyleState {
  style: ChartStyle;
  setStyle: (s: ChartStyle) => void;
  toggle: () => void;
}

export const useChartStyleStore = create<ChartStyleState>()(
  persist(
    (set, get) => ({
      style: 'north',
      setStyle: (style) => set({ style }),
      toggle: () => set({ style: get().style === 'north' ? 'south' : 'north' }),
    }),
    { name: 'kundaliyatra-chart-style' }
  )
);
