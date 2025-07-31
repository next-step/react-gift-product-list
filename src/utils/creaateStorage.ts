export const createStorage = <T = unknown>(
  key: string,
  storage: Storage = window.sessionStorage
) => ({
  get: (): T | null => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: (value: T) => {
    storage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    storage.removeItem(key);
  },
});
