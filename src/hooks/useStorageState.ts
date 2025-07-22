import { useState } from 'react';
import { createStorage } from '@/utils/storage';

export function useStorageState<T>(key: string, initialValue: T) {
  const storage = createStorage<T>(key);
  const [state, setState] = useState<T>(() => storage.get() ?? initialValue);

  const setValue = (value: T) => {
    setState(value);
    storage.set(value);
  };

  const removeValue = () => {
    setState(initialValue);
    storage.remove();
  };

  return [state, setValue, removeValue] as const;
}
