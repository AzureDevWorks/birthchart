/**
 * Test setup — runs before every test file.
 *
 * zustand/persist expects `localStorage` to exist. Node ships an
 * experimental one in recent versions, but it is not always writable
 * or consistent. Install a small in-memory shim so store tests are
 * deterministic and isolated between runs.
 */

const memory = new Map<string, string>();

const shim = {
  getItem: (key: string): string | null => memory.get(key) ?? null,
  setItem: (key: string, value: string): void => {
    memory.set(key, String(value));
  },
  removeItem: (key: string): void => {
    memory.delete(key);
  },
  clear: (): void => {
    memory.clear();
  },
  get length(): number {
    return memory.size;
  },
  key: (i: number): string | null => Array.from(memory.keys())[i] ?? null,
};

try {
  Object.defineProperty(globalThis, 'localStorage', {
    value: shim,
    writable: true,
    configurable: true,
  });
} catch {
  // Node may have made it non-configurable — ignore, tests will still
  // work if it is properly functional.
}