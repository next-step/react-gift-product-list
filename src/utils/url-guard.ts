export const parseUrlParam = <T extends string>(
  value: string | null,
  validValues: readonly { id: T }[],
  defaultValue: T,
): T => {
  if (value && validValues.some(item => item.id === value)) {
    return value as T;
  }
  return defaultValue;
};
