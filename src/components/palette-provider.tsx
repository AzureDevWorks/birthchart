import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PaletteName = 'amber' | 'violet' | 'green' | 'rose' | 'slate';

const STORAGE_KEY = 'kundaliyatra-palette';

interface PaletteContextValue {
  palette: PaletteName;
  setPalette: (p: PaletteName) => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteName>(() => {
    if (typeof window === 'undefined') return 'amber';
    return (localStorage.getItem(STORAGE_KEY) as PaletteName) || 'amber';
  });

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette: setPaletteState }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider');
  return ctx;
}
