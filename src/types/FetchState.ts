export interface FetchState<T> {
  data: T[] | null;
  isLoading: boolean;
  isError: boolean;
}
