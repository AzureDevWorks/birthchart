import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProviderConfig {
  apiKey: string;
  preferredModel?: string;
}

export interface AiSettingsState {
  providers: Record<string, ProviderConfig>;
  providerOrder: string[];

  setApiKey: (providerId: string, key: string) => void;
  setPreferredModel: (providerId: string, modelId: string) => void;
  toggleInPool: (providerId: string) => void;
  moveUp: (providerId: string) => void;
  moveDown: (providerId: string) => void;
  setAsPrimary: (providerId: string) => void;
  clearProvider: (providerId: string) => void;
  clearAll: () => void;
}

const STORE_VERSION = 5;
const EMPTY_CONFIG: ProviderConfig = Object.freeze({ apiKey: '' });
const SESSION_PREFIX = 'kundaliyatra-ai-key:';

function safeSessionGet(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function safeSessionSet(key: string, value: string): void {
  try {
    if (value) sessionStorage.setItem(key, value);
    else sessionStorage.removeItem(key);
  } catch { /* private mode */ }
}

export const useAiSettings = create<AiSettingsState>()(
  persist(
    (set) => ({
      providers: {},
      providerOrder: [],

      setApiKey: (providerId, key) =>
        set((s) => {
          safeSessionSet(SESSION_PREFIX + providerId, key);
          return {
            providers: {
              ...s.providers,
              [providerId]: {
                ...(s.providers[providerId] ?? { apiKey: '' }),
                apiKey: key,
              },
            },
          };
        }),

      setPreferredModel: (providerId, modelId) =>
        set((s) => ({
          providers: {
            ...s.providers,
            [providerId]: {
              ...(s.providers[providerId] ?? { apiKey: '' }),
              preferredModel: modelId,
            },
          },
        })),

      toggleInPool: (providerId) =>
        set((s) => {
          const inPool = s.providerOrder.includes(providerId);
          return inPool
            ? { providerOrder: s.providerOrder.filter((id) => id !== providerId) }
            : { providerOrder: [...s.providerOrder, providerId] };
        }),

      moveUp: (providerId) =>
        set((s) => {
          const idx = s.providerOrder.indexOf(providerId);
          if (idx <= 0) return s;
          const next = [...s.providerOrder];
          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
          return { providerOrder: next };
        }),

      moveDown: (providerId) =>
        set((s) => {
          const idx = s.providerOrder.indexOf(providerId);
          if (idx < 0 || idx >= s.providerOrder.length - 1) return s;
          const next = [...s.providerOrder];
          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
          return { providerOrder: next };
        }),

      setAsPrimary: (providerId) =>
        set((s) => {
          if (!s.providerOrder.includes(providerId)) {
            return { providerOrder: [providerId, ...s.providerOrder] };
          }
          return { providerOrder: [providerId, ...s.providerOrder.filter((id) => id !== providerId)] };
        }),

      clearProvider: (providerId) =>
        set((s) => {
          safeSessionSet(SESSION_PREFIX + providerId, '');
          const next = { ...s.providers };
          delete next[providerId];
          return { providers: next, providerOrder: s.providerOrder.filter((id) => id !== providerId) };
        }),

      clearAll: () => {
        try {
          for (let i = sessionStorage.length - 1; i >= 0; i--) {
            const k = sessionStorage.key(i);
            if (k && k.startsWith(SESSION_PREFIX)) sessionStorage.removeItem(k);
          }
        } catch { /* ignore */ }
        set({ providers: {}, providerOrder: [] });
      },
    }),
    {
      name: 'kundaliyatra-ai-settings',
      version: STORE_VERSION,
      migrate: (persisted: any, fromVersion: number) => {
        let state = { ...persisted };
        if (fromVersion < 2) {
          const oldActive = state?.activeProviderId ?? null;
          state = { providers: state?.providers ?? {}, providerOrder: oldActive ? [oldActive] : [] };
        }
        delete state.readingDefaults;
        if (state?.providers) {
          for (const id of Object.keys(state.providers)) {
            if (state.providers[id]?.apiKey) state.providers[id].apiKey = '';
          }
        }
        return state;
      },
      partialize: (s) => ({
        providerOrder: s.providerOrder,
        providers: Object.fromEntries(
          Object.entries(s.providers).map(([id, cfg]) => [
            id,
            { apiKey: '', preferredModel: cfg.preferredModel },
          ])
        ),
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        for (const id of Object.keys(state.providers)) {
          const k = safeSessionGet(SESSION_PREFIX + id);
          if (k) state.providers[id] = { ...state.providers[id], apiKey: k };
        }
      },
    }
  )
);

export function useProviderConfig(providerId: string): ProviderConfig {
  return useAiSettings((s) => s.providers[providerId] ?? EMPTY_CONFIG);
}

export const useProviderOrder = (): string[] => useAiSettings((s) => s.providerOrder);

export function getAiSettingsSnapshot() {
  const s = useAiSettings.getState();
  return { providers: s.providers, providerOrder: s.providerOrder };
}
