import { useState } from 'react';

interface UseMutationOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export const useMutation = <TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    try {
      const result = await mutationFn(variables);
      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      const typedError = error as TError;
      console.error('Mutation failed:', typedError);
      options?.onError?.(typedError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
};
