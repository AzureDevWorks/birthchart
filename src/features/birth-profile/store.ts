import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthData, ProfileRelation } from '@/domain/astrology/birth-data';
import { removeStoredKundli } from '@/lib/kundli-cache-storage';

const STORE_VERSION = 2;

interface BirthStore {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  masterProfileId: string | null;

  addProfile: (
    data: Omit<BirthData, 'id' | 'createdAt'> & {
      relation?: ProfileRelation;
    }
  ) => string;
  updateProfile: (id: string, patch: Partial<BirthData>) => void;
  removeProfile: (id: string) => void;
  setActive: (id: string) => void;
  setMaster: (id: string) => void;
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
    (set, get) => ({
      profiles: {},
      activeProfileId: null,
      masterProfileId: null,

      addProfile: (data) => {
        const id = makeId();
        const full: BirthData = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
          relation: data.relation ?? 'family',
        };
        set((s) => {
          const hasMaster = Boolean(s.masterProfileId);
          return {
            profiles: { ...s.profiles, [id]: full },
            activeProfileId: id,
            masterProfileId: hasMaster ? s.masterProfileId : id,
          };
        });
        return id;
      },

      updateProfile: (id, patch) =>
        set((s) => {
          const existing = s.profiles[id];
          if (!existing) return s;
          const birthChanged =
            (patch.localDate !== undefined && patch.localDate !== existing.localDate) ||
            (patch.localTime !== undefined && patch.localTime !== existing.localTime) ||
            (patch.place !== undefined && patch.place.id !== existing.place.id);
          if (birthChanged) { try { removeStoredKundli(existing); } catch { /* noop */ } }
          return {
            profiles: {
              ...s.profiles,
              [id]: { ...existing, ...patch, id: existing.id },
            },
          };
        }),

      removeProfile: (id) =>
        set((s) => {
          const next = { ...s.profiles };
          delete next[id];
          const remainingIds = Object.keys(next);

          const nextActive =
            s.activeProfileId === id ? (remainingIds[0] ?? null) : s.activeProfileId;

          const nextMaster =
            s.masterProfileId === id
              ? (remainingIds[0] ?? null)
              : s.masterProfileId;

          return {
            profiles: next,
            activeProfileId: nextActive,
            masterProfileId: nextMaster,
          };
        }),

      setActive: (id) => {
        if (!get().profiles[id]) return;
        set({ activeProfileId: id });
      },

      setMaster: (id) => {
        if (!get().profiles[id]) return;
        set((s) => {
          const next = { ...s.profiles };
          for (const key of Object.keys(next)) {
            next[key] = {
              ...next[key],
              relation: key === id ? 'self' : next[key].relation === 'self' ? 'family' : next[key].relation,
            };
          }
          return { profiles: next, masterProfileId: id };
        });
      },

      clearAll: () =>
        set({ profiles: {}, activeProfileId: null, masterProfileId: null }),
    }),
    {
      name: 'kundaliyatra-store',
      version: STORE_VERSION,
      migrate: (persisted: any, fromVersion: number) => {
        let state = { ...persisted };
        if (fromVersion < 2) {
          // Seed masterProfileId with the active profile on upgrade
          state.masterProfileId =
            state.masterProfileId ?? state.activeProfileId ?? null;
        }
        return state;
      },
    }
  )
);

export const useActiveProfile = (): BirthData | null =>
  useBirthStore((s) =>
    s.activeProfileId ? s.profiles[s.activeProfileId] ?? null : null
  );

export const useMasterProfile = (): BirthData | null =>
  useBirthStore((s) =>
    s.masterProfileId ? s.profiles[s.masterProfileId] ?? null : null
  );