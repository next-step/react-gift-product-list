export type HttpsSuccessResponseType = {
  email: string;
  name: string;
  authToken: string;
};
export type HttpsFailedResponseTypes = {
  message: string;
  status: string;
  statusCode: number;
};
