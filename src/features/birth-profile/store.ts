import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthData } from '@/domain/astrology/birth-data';

const STORE_VERSION = 1;

interface BirthStore {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  addProfile: (data: Omit<BirthData, 'id' | 'createdAt'>) => string;
  removeProfile: (id: string) => void;
  setActive: (id: string) => void;
  clearAll: () => void;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const useBirthStore = create<BirthStore>()(
  persist(
    (set) => ({
      profiles: {},
      activeProfileId: null,

      addProfile: (data) => {
        const id = makeId();
        const full: BirthData = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({
          profiles: { ...s.profiles, [id]: full },
          activeProfileId: id,
        }));
        return id;
      },

      removeProfile: (id) =>
        set((s) => {
          const next = { ...s.profiles };
          delete next[id];
          return {
            profiles: next,
            activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
          };
        }),

      setActive: (id) => set({ activeProfileId: id }),
      clearAll: () => set({ profiles: {}, activeProfileId: null }),
    }),
    { name: 'kundaliyatra-store', version: STORE_VERSION }
  )
);

export const useActiveProfile = (): BirthData | null =>
  useBirthStore((s) =>
    s.activeProfileId ? s.profiles[s.activeProfileId] ?? null : null
  );
