export const isErrorWithMessage = (
  err: unknown
): err is { response?: { data?: { message?: string } } } =>
  typeof err === 'object' &&
  err !== null &&
  'response' in err &&
  typeof (err as any).response?.data?.message === 'string';
