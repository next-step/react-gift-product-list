export const hasErrorMessage = (
  err: unknown
): err is { response?: { data?: { message?: string } } } =>
  typeof err === 'object' &&
  err !== null &&
  'response' in err &&
  typeof (err as any).response?.data?.message === 'string';

export const hasAxiosErrorStatus = (
  err: unknown,
  status: number
): err is { response: { status: number } } =>
  typeof err === 'object' &&
  err !== null &&
  'response' in err &&
  typeof (err as any).response?.status === 'number' &&
  (err as any).response.status === status;
