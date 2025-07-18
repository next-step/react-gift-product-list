export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Params {
  [key: string]:
    | boolean
    | string
    | string[]
    | number
    | number[]
    | { [key: string]: string[] }
    | undefined;
}

export interface HttpParamsType<T = unknown> {
  queryParams?: Params;
  body?: T;
}
