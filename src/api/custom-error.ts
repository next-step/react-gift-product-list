import { API_ERROR_MESSAGE } from "@/constants";

export class UnauthorizedError extends Error {
  constructor(message = API_ERROR_MESSAGE.LOGIN) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class NetworkError extends Error {
  constructor(message = API_ERROR_MESSAGE.NETWORK) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}
