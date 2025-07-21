export type ApiError = {
  status: string;
  statusCode: number;
  message: string;
};

export type ApiErrorResponse = {
  data: ApiError;
};
