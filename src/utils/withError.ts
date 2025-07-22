interface WithErrorOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export const withError = <Args extends any[], Result>(
  fn: (...args: Args) => Promise<Result>,
  options: WithErrorOptions<Result>
) => {
  return async (...args: Args): Promise<Result> => {
    try {
      const result = await fn(...args);
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      options.onError?.(error);
      throw error;
    }
  };
};
