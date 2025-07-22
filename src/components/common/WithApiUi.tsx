import type { ReactNode } from 'react';

interface WithApiUiProps<T> {
  data: T[] | null;
  error: boolean;
  loading?: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

const WithApiUi = <T,>({
  data,
  error,
  loading,
  errorFallback,
  children,
}: WithApiUiProps<T>) => {
  if (error) return <>{errorFallback}</>;
  if (!data || data.length === 0) return <>{loading}</>;
  return <>{children}</>;
};

export default WithApiUi;
